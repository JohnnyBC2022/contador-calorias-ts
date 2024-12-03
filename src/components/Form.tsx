import { useState, ChangeEvent, FormEvent, Dispatch } from "react";
import {v4 as uuidv4} from 'uuid';
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>
}

const INITIAL_STATE : Activity= {
  id: uuidv4(),
  category: 1,
  activityName: "",
  calories: 0,
};

export default function Form({dispatch}: FormProps) {
  const [activity, setActivity] = useState<Activity>(INITIAL_STATE);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { activityName, calories } = activity;
    return activityName.trim() !== "" && calories > 0;
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({type: 'save-activity', payload: {newActivity: activity}});

    setActivity({
      ...INITIAL_STATE,
      id: uuidv4()
    });
  }

  return (
    <form
      className="bg-white space-y-5 shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">
          Categoria:
        </label>
        <select
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activityName" className="font-bold">
          Actividad:
        </label>
        <input
          id="activityName"
          type="text"
          className="border border-slate-300 p-2 rounded-lg "
          placeholder="Ej. Comida, Ejercicio"
          value={activity.activityName}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorías:
        </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg "
          placeholder="Ej. Calorías, 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-slate-800 hover:bg-slate-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-30"
        value={activity.category === 1 ? "Guardar comida" : "Guardar ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
