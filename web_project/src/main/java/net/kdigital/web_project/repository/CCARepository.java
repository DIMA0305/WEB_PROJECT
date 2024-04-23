package net.kdigital.web_project.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import net.kdigital.web_project.entity.BoardEntity;

public interface CCARepository extends JpaRepository<BoardEntity, Long> {

 
    @Query(value = "SELECT * FROM consult_cca WHERE product_category = :productCategory", nativeQuery = true)
    Page<BoardEntity> findAllByProductCategory(@Param("productCategory") String productCategory, PageRequest pageRequest);

}
