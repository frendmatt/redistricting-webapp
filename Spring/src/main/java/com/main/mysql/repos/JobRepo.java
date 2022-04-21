/*package com.main.mysql.repos;

import com.main.enums.StateCode;
import com.main.mysql.models.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepo extends JpaRepository<Job, Integer>
{
    @Query("SELECT j FROM Job j WHERE j.stateCode = ?1")
    Optional<List<Job>> findJobsByState(StateCode stateCode);
}*/