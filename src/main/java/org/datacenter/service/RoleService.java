package org.datacenter.service;

import java.util.List;

import org.datacenter.mapper.RoleMapper;
import org.datacenter.mapper.UserMapper;
import org.datacenter.model.Role;
import org.datacenter.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

	 @Autowired RoleMapper roleMapper;
	    
	 public List<Role> findRoleByRoleName(List<String> rolename){
	        return roleMapper.findRoleByRoleName(rolename);
	    }
}
