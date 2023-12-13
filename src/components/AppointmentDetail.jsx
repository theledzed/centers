"use client";
import { useContext } from "react";
import { notification, Button } from "antd";
import axios from "axios";
import { EnvironmentOutlined, ClockCircleOutlined } from "@ant-design/icons";
import CenterContext from "@/store/centersContext";
import dayjs from "dayjs";
import { setState } from "@/store/actions";
import styles from "@/app/page.module.scss";

export default function AppointmentDetail() {
  const [state, dispatch] = useContext(CenterContext);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = async (type, description, message) => {
    await api[type]({
      message,
      description,
    });
  };
  const {
    centerName,
    centerAddress,
    timeSelected,
    dateSelected,
    appointment_Type_Id,
    calendar_Id,
    token,
  } = state;

  const createAppoiment = async () => {
    try {
      dispatch(
        setState({
          isLoading: true,
        })
      );
      const body = {
        datetime: timeSelected,
        appointmentTypeID: appointment_Type_Id,
        firstName: "Cristopher Flores",
        email: "curf96@gmail.com",
        phone: "556562486",
        form: {},
        calendarID: calendar_Id,
        customer_id: "GWUUKTF7",
        appointment: "retail",
        public_key: "4y7mu6wyu3cgv4y",
        journey: "retail",
        partner: "retail",
        payment: true,
        rescheduling: false,
        appointment_reason: "scan",
      };

      const config = {
        headers: { Authorization: token },
      };
      const response = await axios.post(
        "https://dev.moons.rocks/appointment/appointment",
        body,
        config
      );
      dispatch(
        setState({
          isLoading: false,
        })
      );
      if (response.data.appointmentTypeID) {
        await openNotificationWithIcon(
          "success",
          `Se creo tu cita correctamente con el numero: ${response.data.appointmentTypeID}`,
          "Agendada"
        );
      }
    } catch (error) {
      dispatch(
        setState({
          isLoading: false,
        })
      );
      openNotificationWithIcon(
        "error",
        `Selecciona otra hora por favor`,
        "Fecha ocupada"
      );
    }
  };

  return (
    <div className={styles.appointmentDetailContainer}>
      {contextHolder}
      <div className={styles.appointmentDetailInfo}>
        <div className={styles.columnAppointment}>
          <EnvironmentOutlined />
          <div className={styles.titleContainer}>
            <p className={styles.titleCardInfo}> {centerName ?? centerName}</p>
            <p className={styles.addressCenter}>
              {centerAddress ?? centerAddress}
            </p>
          </div>
        </div>
        <div className={styles.columnAppointment}>
          <ClockCircleOutlined />
          <div className={styles.titleContainer}>
            <p className={styles.titleCardInfo}>
              {dayjs(dateSelected).format("dddd M/YY")}
            </p>
            <p className={styles.addressCenter}>
              {dayjs(timeSelected).format("H:mm")}
            </p>
          </div>
        </div>
      </div>
      <Button onClick={createAppoiment} className={styles.confirmButton}>
        confirmar cita
      </Button>
      <Button
        className={styles.flowButtons}
        onClick={() => {
          dispatch(
            setState({
              isDetailView: true,
            })
          );
        }}
      >
        Ver el calendario
      </Button>
      <Button
        className={styles.flowButtons}
        onClick={() => {
          dispatch(
            setState({
              timeSelected: null,
              dateSelected: null,
              isDetailView: false,
              appointment_Type_Id: null,
              calendar_Id: null,
            })
          );
        }}
      >
        Regresar al inicio
      </Button>
    </div>
  );
}
