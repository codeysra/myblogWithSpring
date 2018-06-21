package com.ysrsdn.myblog.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="post")
public class Post {

	@Id
	@Column(name="id")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(name="title")
	@NotNull
	@NotBlank
	private String title;
	
	@Column(name="small_desc")
	@NotNull
	@NotBlank
	private String smallDesc;
	
	@Column(name="content")
	@NotNull
	@NotBlank
	private String content;
	
	@Column(name="status")
	private boolean status;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="category_name")
	@OnDelete(action=OnDeleteAction.CASCADE)
	private Category category;
	
	@Column(name="published_on")
	@JsonFormat(shape=JsonFormat.Shape.STRING, pattern="dd-MM-yyyy")
	private Date publishedOn;
	
	@Column(name="img")
	private String img;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name="user_id")
	@OnDelete(action=OnDeleteAction.CASCADE)
	private User user;

 	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getSmallDesc() {
		return smallDesc;
	}

	public void setSmallDesc(String smallDesc) {
		this.smallDesc = smallDesc;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Date getPublishedOn() {
		return publishedOn;
	}

	public void setPublishedOn(Date publishedOn) {
		this.publishedOn = publishedOn;
	}

	public String getImg() {
		return img;
	}

	public void setImg(String img) {
		this.img = img;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	
}
