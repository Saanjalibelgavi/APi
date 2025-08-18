package com.saanjali.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.saanjali.ecommerce.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // You can add custom query methods here if needed
}
