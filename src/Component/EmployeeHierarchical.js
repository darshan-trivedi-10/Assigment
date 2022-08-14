import React, { useState, useEffect } from 'react'
import ChildEmploy from './ChildEmploy'
import axios from 'axios'


function EmployeeHierarchical() {

    const [allEmploy, setAllEmploy] = useState([]);

    const manager = allEmploy.filter((employ) => employ.manager_id === "")

    const getEmploy = (mId) => {
        return allEmploy.filter((employ) => employ.manager_id === mId);
    }


    useEffect(() => {
        axios.get(`https://opensheet.elk.sh/1gH5Kle-styszcHF2G0H8l1w1nDt1RhO9NHNCpHhKK0M/employees`)
            .then(function (res) {
                let data = res.data;
                setAllEmploy(data);
            })
            .catch(function (error) {
                console.log(error)
            })

    }, [])


    return (
        <>
            <center>
                {
                    manager.map((employ) => (
                        <ChildEmploy allEmploy={allEmploy} employ={employ} child={getEmploy(employ.id)} />
                    ))
                }
            </center>
        </>
    );

}

export default EmployeeHierarchical;