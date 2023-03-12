export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  fullname: string;
  email: string;
  password: string;
  phone: string;
};

export type AdditionalInfoPayload = {
  user_id: string;
  name: string;
  bir: string;
  dti: string;
  address: string;
};
