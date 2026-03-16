package nit.mapper;


import nit.dto.response.UserResponse;
import nit.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")  // Add this
public interface UserMapper {
    
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    
    @Mapping(source = "role.roleName", target = "role")
    UserResponse toResponse(User user);
}