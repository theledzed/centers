"use client";
import { useContext } from "react";
import { Button } from "antd";
import {
  RollbackOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import CenterContext from "@/store/centersContext";
import { setState } from "@/store/actions";
import usePagination from "@/hooks/usePagination";
import dayjs from "dayjs";
import styles from "@/app/page.module.scss";

export default function CenterDetail() {
  const [state, dispatch] = useContext(CenterContext);
  const { centerSelected, centerName, centerAddress, isDetailView } = state;
  const { activePage, nextPage, previousPage, totalPages, items } =
    usePagination(centerSelected);

  return (
    <main className={styles.centerDetail}>
      <div className={styles.centerDetailInfo}>
        <Button
          onClick={() => {
            dispatch(
              setState({
                isDetailView: !isDetailView,
              })
            );
          }}
          type="link"
        >
          <RollbackOutlined />
        </Button>
        <div className={styles.titleContainer}>
          <p className={styles.titleCenter}> {centerName ?? centerName}</p>
          <p className={styles.addressCenter}>
            {centerAddress ?? centerAddress}
          </p>
        </div>
      </div>
      <p className={styles.selectDayLabel}>Selecciona día y horario</p>
      <div className={styles.paginationContainer}>
        <Button
          className={styles.paginationButton}
          disabled={activePage === 1}
          onClick={() => {
            previousPage();
          }}
        >
          <LeftOutlined />
        </Button>
        <div className={styles.daysContainer}>
          {items &&
            items.map((day) => {
              return (
                <div className={styles.dayColumn}>
                  <p className={styles.dateLabel}>
                    {dayjs(day.date).format("dddd M/YY")}
                  </p>
                  {day?.times?.map(({ time }) => {
                    return (
                      <div
                        onClick={() => {
                          dispatch(
                            setState({
                              timeSelected: time,
                              dateSelected: day.date,
                              isDetailView: !isDetailView,
                            })
                          );
                        }}
                        className={styles.hour}
                      >
                        {dayjs(time).format("H:mm")}
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
        <Button
          className={styles.paginationButton}
          disabled={activePage === totalPages}
          onClick={() => {
            nextPage();
          }}
        >
          <RightOutlined />
        </Button>
      </div>
    </main>
  );
}
