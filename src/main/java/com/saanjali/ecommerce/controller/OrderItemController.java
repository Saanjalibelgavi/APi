package com.saanjali.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.saanjali.ecommerce.model.OrderItem;
import com.saanjali.ecommerce.repository.OrderItemRepository;

@RestController
@RequestMapping("/api/order-items")
public class OrderItemController {

    @Autowired
    private OrderItemRepository orderItemRepository;

    @GetMapping
    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    @PostMapping
    public OrderItem createOrderItem(@RequestBody OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    @GetMapping("/{id}")
    public OrderItem getOrderItemById(@PathVariable Integer id) {
        return orderItemRepository.findById(id).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deleteOrderItem(@PathVariable Integer id) {
        orderItemRepository.deleteById(id);
    }
}
