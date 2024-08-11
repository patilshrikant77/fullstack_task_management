package com.task_manager.tms.service;


import com.task_manager.tms.dto.UserDTO;
import com.task_manager.tms.entity.Users;
import com.task_manager.tms.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UsersService {

    @Autowired
    private UsersRepo usersRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDTO register(UserDTO registrationRequest){
        UserDTO userDTO = new UserDTO();

        try {
            Users ourUser = new Users();
            ourUser.setEmail(registrationRequest.getEmail());
            ourUser.setCity(registrationRequest.getCity());
            ourUser.setRole(registrationRequest.getRole());
            ourUser.setName(registrationRequest.getName());
            ourUser.setName(registrationRequest.getEnabled());
            ourUser.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            Users ourUsersResult = usersRepo.save(ourUser);
            if (ourUsersResult.getId()>0) {
                userDTO.setUsers((ourUsersResult));
                userDTO.setMessage("User Saved Successfully");
                userDTO.setStatusCode(200);
            }

        }catch (Exception e){
            userDTO.setStatusCode(500);
            userDTO.setError(e.getMessage());
        }
        return userDTO;
    }


    public UserDTO login(UserDTO loginRequest){
        UserDTO userDTO = new UserDTO();
        try {
            authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getEmail(),
                            loginRequest.getPassword()));
            var user = usersRepo.findByEmail(loginRequest.getEmail()).orElseThrow();
            var jwt = jwtUtils.generateToken(user);
            var refreshToken = jwtUtils.generateRefreshToken(new HashMap<>(), user);
            userDTO.setStatusCode(200);
            userDTO.setToken(jwt);
            userDTO.setRole(user.getRole());
            userDTO.setRefreshToken(refreshToken);
            userDTO.setExpirationTime("24Hrs");
            userDTO.setMessage("Successfully Logged In");

        }catch (Exception e){
            userDTO.setStatusCode(500);
            userDTO.setMessage(e.getMessage());
        }
        return userDTO;
    }





    public UserDTO refreshToken(UserDTO refreshTokenReqiest){
        UserDTO userDTO = new UserDTO();
        try{
            String ourEmail = jwtUtils.extractUsername(refreshTokenReqiest.getToken());
            Users users = usersRepo.findByEmail(ourEmail).orElseThrow();
            if (jwtUtils.isTokenValid(refreshTokenReqiest.getToken(), users)) {
                var jwt = jwtUtils.generateToken(users);
                userDTO.setStatusCode(200);
                userDTO.setToken(jwt);
                userDTO.setRefreshToken(refreshTokenReqiest.getToken());
                userDTO.setExpirationTime("24Hr");
                userDTO.setMessage("Successfully Refreshed Token");
            }
            userDTO.setStatusCode(200);
            return userDTO;

        }catch (Exception e){
            userDTO.setStatusCode(500);
            userDTO.setMessage(e.getMessage());
            return userDTO;
        }
    }


    public UserDTO getAllUsers() {
        UserDTO userDTO = new UserDTO();

        try {
            List<Users> result = usersRepo.findAll();
            if (!result.isEmpty()) {
                userDTO.setUsersList(result);
                userDTO.setStatusCode(200);
                userDTO.setMessage("Successful");
            } else {
                userDTO.setStatusCode(404);
                userDTO.setMessage("No users found");
            }
            return userDTO;
        } catch (Exception e) {
            userDTO.setStatusCode(500);
            userDTO.setMessage("Error occurred: " + e.getMessage());
            return userDTO;
        }
    }


    public UserDTO getUsersById(Integer id) {
        UserDTO userDTO = new UserDTO();
        try {
            Users usersById = usersRepo.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            userDTO.setUsers(usersById);
            userDTO.setStatusCode(200);
            userDTO.setMessage("Users with id '" + id + "' found successfully");
        } catch (Exception e) {
            userDTO.setStatusCode(500);
            userDTO.setMessage("Error occurred: " + e.getMessage());
        }
        return userDTO;
    }


    public UserDTO deleteUser(Integer userId) {
        UserDTO userDTO = new UserDTO();
        try {
            Optional<Users> userOptional = usersRepo.findById(userId);
            if (userOptional.isPresent()) {
                usersRepo.deleteById(userId);
                userDTO.setStatusCode(200);
                userDTO.setMessage("User deleted successfully");
            } else {
                userDTO.setStatusCode(404);
                userDTO.setMessage("User not found for deletion");
            }
        } catch (Exception e) {
            userDTO.setStatusCode(500);
            userDTO.setMessage("Error occurred while deleting user: " + e.getMessage());
        }
        return userDTO;
    }

    public UserDTO updateUser(Integer userId, Users updatedUser) {
        UserDTO userDTO = new UserDTO();
        try {
            Optional<Users> userOptional = usersRepo.findById(userId);
            if (userOptional.isPresent()) {
                Users existingUser = userOptional.get();
                existingUser.setEmail(updatedUser.getEmail());
                existingUser.setName(updatedUser.getName());
                existingUser.setCity(updatedUser.getCity());
                existingUser.setRole(updatedUser.getRole());

                // Check if password is present in the request
                if (updatedUser.getPassword() != null && !updatedUser.getPassword().isEmpty()) {
                    // Encode the password and update it
                    existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
                }

                Users savedUser = usersRepo.save(existingUser);
                userDTO.setUsers(savedUser);
                userDTO.setStatusCode(200);
                userDTO.setMessage("User updated successfully");
            } else {
                userDTO.setStatusCode(404);
                userDTO.setMessage("User not found for update");
            }
        } catch (Exception e) {
            userDTO.setStatusCode(500);
            userDTO.setMessage("Error occurred while updating user: " + e.getMessage());
        }
        return userDTO;
    }


    public UserDTO getMyInfo(String email){
        UserDTO userDTO = new UserDTO();
        try {
            Optional<Users> userOptional = usersRepo.findByEmail(email);
            if (userOptional.isPresent()) {
                userDTO.setUsers(userOptional.get());
                userDTO.setStatusCode(200);
                userDTO.setMessage("successful");
            } else {
                userDTO.setStatusCode(404);
                userDTO.setMessage("User not found for update");
            }

        }catch (Exception e){
            userDTO.setStatusCode(500);
            userDTO.setMessage("Error occurred while getting user info: " + e.getMessage());
        }
        return userDTO;

    }
}