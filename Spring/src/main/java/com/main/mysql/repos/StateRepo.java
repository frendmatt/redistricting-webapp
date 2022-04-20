package com.main.mysql.repos;

import com.main.enums.StateCode;
import com.main.mysql.models.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StateRepo extends JpaRepository<State, StateCode>
{
}