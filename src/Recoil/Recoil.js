import { atom } from "recoil";

export const SingleAtom = atom({
  key: "SingleAtom",
  default: {
    email: "",
    password: "",
  },
});

export const AccCreated = atom({
  key: "AccCreated",
  default: false,
});

export const IsUserPresent = atom({
  key: "IsUserPresent",
  default: false,
});
