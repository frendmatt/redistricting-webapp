package com.main.mysql.repos;

import com.main.mysql.models.ids.IncumbentId;
import com.main.mysql.models.Incumbent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IncumbentRepo extends JpaRepository<Incumbent, IncumbentId>
{
}