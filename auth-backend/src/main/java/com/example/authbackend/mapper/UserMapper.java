package com.example.authbackend.mapper;

import com.example.authbackend.dto.response.UserResponse;
import com.example.authbackend.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "role", expression = "java(user.getRole().name())")
    UserResponse toUserResponse(User user);
}