package com.saanjali.ecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.saanjali.ecommerce.model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
}
