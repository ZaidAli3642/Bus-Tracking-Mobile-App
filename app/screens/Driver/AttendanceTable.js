import { ScrollView, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
import AuthContext from "../../context/AuthContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../firebase/firebaseConfig";
import Loader from "../../components/Loader";
import { FlashList } from "@shopify/flash-list";
import _ from "lodash";

const AttendanceTable = () => {
  const [studentsAttendance, setStudentsAttendance] = useState([]);
  const [tableHead, setTableHead] = useState([
    { id: 1, label: "#", key: "#" },
    { id: 2, label: "Reg No", key: "rollNo" },
    { id: 3, label: "Student Name", key: "firstname" },
    { id: 3, label: "Driver Name", key: "driverName" },
    { id: 4, label: "Bus No", key: "busNo" },
    { id: 5, label: "Time", key: "timeAndDate" },
    { id: 6, label: "Opening", key: "openingTime.onBoard" },
    { id: 7, label: "Closing", key: "closingTime.offBoard" },
  ]);
  const [sortColumn, setSortColumn] = useState({
    path: "rollNo",
    order: "asc",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSort = (path) => {
    const sortColumnCopy = { ...sortColumn };
    if (path === sortColumnCopy.path) {
      sortColumnCopy.order = sortColumnCopy.order === "asc" ? "desc" : "asc";
    } else {
      sortColumnCopy.path = path;
      sortColumnCopy.order = "asc";
    }
    console.log("Sort COlumn : ", sortColumnCopy);
    setSortColumn(sortColumnCopy);
  };

  const getStudentAttendanceRecord = async () => {
    setLoading(true);
    const attendanceCollection = collection(database, "attendance");

    const q = query(
      attendanceCollection,
      where("institute", "==", user.institute),
      where("busNo", "==", user.busNo)
    );

    const attendanceSnapshot = await getDocs(q);
    const studentsAttendance = attendanceSnapshot.docs.map((student) => ({
      id: student.id,
      ...student.data(),
    }));
    console.log("Students : ", studentsAttendance);
    setStudentsAttendance(studentsAttendance);
    setLoading(false);
  };

  useEffect(() => {
    getStudentAttendanceRecord();
  }, []);

  if (loading) return <Loader />;

  const orderedData = _.orderBy(
    studentsAttendance,
    [sortColumn.path],
    [sortColumn.order]
  );

  return (
    <View style={{ flex: 1, width: "100%", overflow: "scroll" }}>
      <ScrollView
        horizontal
        contentContainerStyle={{ flexGrow: 1, overflow: "scroll" }}
      >
        <DataTable style={{ width: 500 }}>
          <FlashList
            ListHeaderComponent={() => (
              <DataTable.Header>
                {tableHead.map((table) => (
                  <DataTable.Title
                    onPress={() => {
                      handleSort(table.key);
                      alert(table.label);
                    }}
                  >
                    {table.label}
                  </DataTable.Title>
                ))}
              </DataTable.Header>
            )}
            data={orderedData}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item: students, index }) => {
              console.log("Students : ", students);
              return (
                <DataTable.Row style={{ padding: 20 }}>
                  <DataTable.Cell>{index + 1}</DataTable.Cell>
                  <DataTable.Cell>{students.rollNo}</DataTable.Cell>
                  <DataTable.Cell>{students.firstname}</DataTable.Cell>
                  <DataTable.Cell>{students.driverName}</DataTable.Cell>
                  <DataTable.Cell>{students.busNo}</DataTable.Cell>
                  <DataTable.Cell
                    onPress={() =>
                      students.timeAndDate
                        ? alert(students.timeAndDate.toDate().toString())
                        : alert("none")
                    }
                  >
                    {students.timeAndDate
                      ? students.timeAndDate.toDate().toString()
                      : "none"}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <DataTable.Cell>
                      {students?.openingTime?.onBoard && "on board"}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {students?.openingTime?.offBoard && "off board"}
                    </DataTable.Cell>
                  </DataTable.Cell>
                  <DataTable.Cell>
                    <DataTable.Cell>
                      {students?.closingTime?.onBoard && "on board"}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {students?.closingTime?.offBoard && "off board"}
                    </DataTable.Cell>
                  </DataTable.Cell>
                </DataTable.Row>
              );
            }}
            estimatedItemSize={50}
          />
        </DataTable>
      </ScrollView>
    </View>
  );
};

export default AttendanceTable;
