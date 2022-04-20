package com.main.mysql.repos;

import com.main.mysql.models.District;
import com.main.mysql.models.ids.DistrictId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DistrictRepo extends JpaRepository<District, DistrictId>
{
    @Query(nativeQuery = true, value = "call ApplyConstraintsTwo(:job,:compactness,:population_equality,:population_equality_type)")
    public Optional<List<Object[]>> applyConstraints(@Param("job") int jobId, @Param("compactness") float compactness, @Param("population_equality") float populationEquality, @Param("population_equality_type") int populationEqualityType);

    @Query(nativeQuery = true, value = "call majority_minority(:test_job_id,:minority_key)")
    public Optional<List<Object[]>> majority_minority(@Param("test_job_id") int test_job_id, @Param("minority_key") int minority_key);

    @Query(nativeQuery = true, value = "call get_minority_populations(:job_id,:minority_key")
    public Optional<List<Integer>> get_minority_populations(@Param("job_id") int job_id, @Param("minority_key") int minority_key);
}