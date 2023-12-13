"use client";
import { useReducer, useEffect } from "react";
import axios from "axios";
import CenterContext from "@/store/centersContext";
import centersReducer from "@/store/centersReducer";
import initialCentersState from "@/store/initialCentersState";
import { setState } from "@/store/actions";
import CenterList from "@/components/CenterList";
import CenterDetail from "@/components/CenterDetail";
import AppointmentDetail from "@/components/AppointmentDetail";

export default function Home() {
  const [centersState, dispatch] = useReducer(
    centersReducer,
    initialCentersState
  );

  const {
    appointment_Type_Id,
    calendar_Id,
    token,
    isDetailView,
    timeSelected,
    dateSelected,
  } = centersState;

  const getCenters = async () => {
    try {
      const config = {
        headers: { Authorization: token },
      };
      const response = await axios.get(
        "https://dev.moons.rocks/appointment/get-centers?country=mx",
        config
      );
      dispatch(
        setState({
          mxCenters: response?.data,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(
      setState({
        token: "Basic ZGV2TW9vbnNBQjEwMjp5VlhzMjRiWUg4N3N5OGh2dFRENA==",
      })
    );
    if (token) {
      getCenters();
    }
  }, [token]);

  const getCenterDetail = async () => {
    try {
      const config = {
        headers: { Authorization: token },
      };
      const response = await axios.get(
        `https://dev.moons.rocks/appointment/get-slots?appointmentTypeId=${appointment_Type_Id}&calendarId=${calendar_Id}`,
        config
      );
      dispatch(
        setState({
          centerSelected: response?.data,
          isDetailView: true,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (appointment_Type_Id && calendar_Id) {
      getCenterDetail();
    }
  }, [appointment_Type_Id, calendar_Id]);

  return (
    <CenterContext.Provider value={[centersState, dispatch]}>
      {!isDetailView && !timeSelected && !dateSelected && <CenterList />}
      {isDetailView && <CenterDetail />}
      {!isDetailView && timeSelected && dateSelected && <AppointmentDetail />}
    </CenterContext.Provider>
  );
}
