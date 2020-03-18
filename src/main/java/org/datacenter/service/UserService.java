package org.datacenter.service;

import org.datacenter.mapper.UserMapper;
import org.datacenter.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	 @Autowired UserMapper userMapper;
	    public User getUser(String account){
	        return userMapper.getUser(account);
	    }
}
