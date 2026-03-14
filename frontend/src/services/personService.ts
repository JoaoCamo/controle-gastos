import { api } from "../api/api";
import type { Person } from "../types/Person";

export const getPersons = async (): Promise<Person[]> => {
  const response = await api.get("/person");
  return response.data;
};

export const getPersonsWithTransactions = async (): Promise<Person[]> => {
  const response = await api.get("/person/with-transactions");
  return response.data;
};

export const createPerson = async (person: Omit<Person, "id">): Promise<Person> => {
  const response = await api.post("/person", person);
  return response.data;
};

export const deletePerson = async (id: number) => {
  await api.delete(`/person/${id}`);
};

export const updatePerson = async (id: number, person: { name: string; age: number }) => {
  await api.put(`/person/${id}`, person);
};