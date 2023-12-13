"use client";
import { useContext } from "react";
import { Row, Col } from "antd";
import CenterContext from "@/store/centersContext";
import { setState } from "@/store/actions";
import styles from "@/app/page.module.scss";

export default function CenterList() {
  const [state, dispatch] = useContext(CenterContext);
  const { mxCenters } = state;

  return (
    <Row>
      {mxCenters &&
        mxCenters.map((center) => {
          return (
            <Col xs={24} sm={24} md={12} lg={6} xl={6}>
              <div
                onClick={() => {
                  dispatch(
                    setState({
                      appointment_Type_Id: center.Appointment_Type_Id,
                      calendar_Id: center.Calendar_Id,
                      centerName: center.Center_Name,
                      centerAddress: `${center.Street} ${center.Apt} ${center.City} ${center.Country}`,
                    })
                  );
                }}
                className={styles.centerCard}
                key={center.objectId}
              >
                <p className={styles.titleCenter}> {center.Center_Name}</p>
                <p
                  className={styles.addressCenter}
                >{`${center.Street} ${center.Apt} ${center.City} ${center.Country}`}</p>
              </div>
            </Col>
          );
        })}
    </Row>
  );
}
