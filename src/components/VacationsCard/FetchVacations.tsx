import { useEffect, useContext } from "react";


import { RenderCard } from "./RenderCard";

import { getAllVacationEspeciallyUser } from "../../Api-Calls/vacationsApi/getAllVacationEspeciallyUser";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { FetchVacation } from "../../modals/VacationsModals/FetchVacation.modal";
import { StateContext } from "../Context/StateContext";
import { DisplaysAdminAddVacation } from "../OptionsForAdmin/DisplaysAdminAddVacation";

import { getItemLocalStorage } from "../../LocalStoragFuncation/getItemLocalStorage";

export const FetchVacations: React.FC<Partial<FetchVacation>> = ({
  isUserName,
}) => {
  //this use state only in admin state !!!
  const { appState, setAppState } = useContext(StateContext);
  const { userData, addNewVacationBtn, removeVacationBtn } = appState;
  const token: string = getItemLocalStorage("jwt");
  const fetchVacations = async () => {
    let vacationByUserName: [];

    const data: any = await getAllVacationEspeciallyUser(isUserName, token);

    vacationByUserName = data.data;
    setAppState({ ...appState, fetchVacations: vacationByUserName });
  };

  useEffect(() => {
    fetchVacations();
  }, [isUserName, !addNewVacationBtn, !removeVacationBtn,token]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {userData?.isAdministrator ? (
        <DisplaysAdminAddVacation checkAdmin={userData?.isAdministrator} />
      ) : null}

      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {appState.fetchVacations &&
          appState.fetchVacations.map(
            (
              {
                Description,
                CheckIn,
                CheckOut,
                follow,
                Price,
                Id,
                Img,
                followId,
                Destination,
                isUserName,
              }: any,
              index: number
            ) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Item>
                  <RenderCard
                    Description={Description}
                    CheckIn={CheckIn}
                    CheckOut={CheckOut}
                    follow={follow}
                    Price={Price}
                    Id={Id}
                    Img={Img}
                    followId={followId}
                    Destination={Destination}
                    isUserName={userData?.userName}
                    checkAdmin={userData?.isAdministrator}
                  />
                </Item>
              </Grid>
            )
          )}
      </Grid>
    </Box>
  );
};
const Item = styled(Paper)(({ theme }) => ({
  background: "#bab8b8",
}));
