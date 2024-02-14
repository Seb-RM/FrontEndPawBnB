import React from "react";
import { useEffect, useState } from "react";
import { setLocationFilter, setPriceFilter } from "../../redux/dogsisterSlice";
import { useDispatch, useSelector } from "react-redux";
import { ContainerFilter } from "./filter.styled";
import filterIcon from '../../assets/img/filterIcon.svg';
import mapIcon from '../../assets/img/mapIcon.svg';
import dolarIcon from '../../assets/img/dollarIcon.svg';

const Filter = () => {
    const dispatch = useDispatch();
    
    const dogsisters = useSelector((state) => state.dogsister.dogsisters);

    const handleLocationFilter = (event) => {
        dispatch(setLocationFilter(event.target.value));
    };

    const handlePriceFilter = (event) => {
        const minRates = parseInt(document.getElementById('minRates').value);
        const maxRates = parseInt(document.getElementById('maxRates').value);

        dispatch(setPriceFilter({ minRates, maxRates }));
    };


    // Obtener ciudades únicas
    const [uniqueCities, setUniqueCities] = useState([]);

    useEffect(() => {
        if (dogsisters.length > 0) {
        const cities = [...new Set(dogsisters.map(dogSister => dogSister.city))];
        setUniqueCities(cities);
        }
    }, [dogsisters]);

    return(
        <ContainerFilter>
            <div className="filter-title"><img src={filterIcon} alt="filterIcon" /><span>FILTROS</span></div>
            <div className="filters">
                <div className="filter filter-city">
                    <div className="city-title">
                        <img src={mapIcon} alt="mapIcon" />
                        <p className="city-ubi">Ubicación</p>
                    </div>
                    <select className='select-box' onChange={handleLocationFilter}>
                        <option>Ubicación</option>
                        <option value="all">Todos</option>
                        {uniqueCities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                </div>

                <div className="filter filter-rates">
                    <div className="rates-title"><img src={dolarIcon} alt="dolarIcon" /><span>Precios</span></div>
                    <div className="rates-inputs">
                        <input className="input-rates" type="text" name="minRates" id="minRates" placeholder="Mínimo" />
                        <input className="input-rates" type="text" name="maxRates" id="maxRates" placeholder="Máximo" />
                        <button className="btn-rates" onClick={handlePriceFilter}>Filtrar</button>
                    </div>
                </div>
            </div>
        </ContainerFilter>
    )
}

export default Filter;