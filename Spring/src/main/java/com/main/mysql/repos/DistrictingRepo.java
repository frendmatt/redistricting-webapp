/*package com.main.mysql.repos;

import com.main.mysql.models.Districting;
import com.main.mysql.models.ids.DistrictingId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DistrictingRepo extends JpaRepository<Districting, DistrictingId>
{
    @Query(nativeQuery = true, value = "Select county from districting_split_counties_list where job_id=:job_id and districting_position_id:districting_position_id")
    public Optional<List<String>> splitCountiesList(@Param("job_id") int job_id, @Param("districting_position_id") int districting_position_id);
}*/