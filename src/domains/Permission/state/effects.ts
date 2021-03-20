// Third party
import { check, request } from "react-native-permissions";

export const requestPermission = async (permission) => await request(permission);
export const checkPermission = async (permission) => await check(permission);