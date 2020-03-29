package org.datacenter.model;

import java.util.Date;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User  {

	private int id;
	private String username;
	private String password;
	private String nickname;
	private int sex;
	private Date createtime;
	private List<Role> roles;
	
}
