import { useState, ChangeEvent } from "react";
import { categories } from "../data/categories";

export default function Form() {

  const [activity, setActivity] = useState({
    category: 1,
    activityName: "",
    calories: 0
  });

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    setActivity({
      ...activity,
      [e.target.id]: e.target.value
    })
  }

  return (
    <form className="bg-white space-y-5 shadow p-10 rounded-lg">
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
            <option key={category.id} value={category.name}>
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
        className="bg-slate-800 hover:bg-slate-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
        value='Guardar comida o ejercicio'
      />
    </form>
  );
}
