import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  // console.log("cities", cities);
  if (cities.length === 0)
    return (
      <div>
        <Message message={"You can start by adding yours"} />
      </div>
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city._id} />
      ))}
    </ul>
  );
}

export default CityList;
