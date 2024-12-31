"use client";
import React, { useEffect } from "react";
import { useReservationHook } from "./reservation.hook";
import { Button, CircularProgress, Modal } from "@mui/material";
import Header from "@/app/components/Header";
import Logo from "@/app/components/Logo";
import InputField, { InputDropdown } from "@/app/components/InputField/InputField";
import { InvitedBy, ReservationType } from "@/app/models/enums";

const Register = () => {
  const hook = useReservationHook();
  useEffect(() => {
    hook.getUserData();
  }, []);
  return (
    <>
      <Header title="Reservation">
        <div className="relative flex flex-col items-center">
          <div className="flex flex-col w-full max-w-5xl p-5">
            <div className="text-center flex flex-col gap-8 items-center">
              <br />
              <br /> You may RSVP below.
            </div>
            <br />
            <form onSubmit={hook.reserve} onReset={hook.decline} className="flex flex-col gap-4 justify-stretch items-stretch">
              <div className="flex flex-col md:flex-row gap-4">
                <InputField
                  className="basis-1/2"
                  title="First Name"
                  type="text"
                  id="firstName"
                  value={hook.dto?.firstName ?? ""}
                  maxLength={10}
                  onDataChange={hook.setFirstName}
                  disabled={hook.state.reserved}
                />
                <InputField
                  className="basis-1/2"
                  title="Last Name"
                  type="text"
                  id="lastName"
                  value={hook.dto?.lastName ?? ""}
                  onDataChange={hook.setLastName}
                  disabled={hook.state.reserved}
                />
              </div>
              {/* <div className="flex flex-col md:flex-row gap-4">
                <InputField
                  className="basis-2/3"
                  title="Email"
                  type="email"
                  id="email"
                  value={hook.dto?.email ?? ""}
                  onDataChange={hook.setEmail}
                  disabled={hook.state.reserved}
                />
                <InputField
                  className="basis-1/3"
                  title="Phone no."
                  type="number"
                  id="phoneNumber"
                  value={hook.dto?.phoneNumber ?? ""}
                  onDataChange={hook.setPhoneNumber}
                  disabled={hook.state.reserved}
                />
              </div> */}
              <InputDropdown
                title="Invited By"
                type="text"
                id="invitedBy"
                items={Object.values(InvitedBy)}
                onItemSelect={hook.setInvitedBy}
                disabled={hook.state.reserved}
                value={hook.dto?.invitedBy}
              />
              {hook.dto?.reservationType != ReservationType.plusOne ? null : (
                <>
                  <div className="px-2 text-lg">Plus One: </div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <InputField
                      className="basis-1/2"
                      title="First Name"
                      type="text"
                      id="plusOneFirstName"
                      onDataChange={hook.setPlusOneFirstName}
                      disabled={hook.state.reserved}
                      value={hook.dto?.plusOne?.firstName ?? ""}
                    />
                    <InputField
                      className="basis-1/2"
                      title="Last Name"
                      type="text"
                      id="plusOneLastName"
                      onDataChange={hook.setPlusOneLastName}
                      disabled={hook.state.reserved}
                      value={hook.dto?.plusOne?.lastName ?? ""}
                    />
                  </div>
                </>
              )}
              {hook.state.reserved ? (
                <div className="text-center">Seems you've already been registered. Thank you for attending our wedding.</div>
              ) : (
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <input className="basis-1/2" disabled={!hook.canReserve()} type="submit" value="Reserve" />
                  <input className="basis-1/2" disabled={hook.state.reserved} type="reset" value="Decline" />
                </div>
              )}
            </form>
          </div>
          {hook.state.isLoading ? (
            <div className="absolute text-lg flex items-center justify-center flex-col w-full h-full backdrop-blur-sm">
              {hook.state.loadingMessage}
              <CircularProgress className="self-center text-primary m-2" thickness={3} size={50} color="error" />
            </div>
          ) : null}
          <Modal
            open={hook.state.hasError}
            onClose={() => {
              hook.removeError();
            }}
            className="flex justify-center items-center">
            <div className="relative bg-background p-10">{hook.state.errorMessage}</div>
          </Modal>
          {/* {hook.state.hasError ? (
            <div className="absolute text-lg flex items-center justify-center flex-col w-full h-full backdrop-blur-sm">
              {hook.state.errorMessage} <button onClick={() => {}}>Ok</button>
            </div>
          ) : null} */}
        </div>
      </Header>
    </>
  );
};

export default Register;
