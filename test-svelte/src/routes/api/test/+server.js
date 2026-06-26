import { json } from "@sveltejs/kit";

let persons = [
  { id: 1, name: "Alicia", age: 25 },
  { id: 2, name: "Maria", age: 30 },
  { id: 3, name: "Agustin", age: 35 },
];

export async function GET({ url }) {
  const id = url.searchParams.get("id");
  if (id) {
    const person = persons.find((p) => p.id === Number(id));
    if (person) {
      return json(person);
    } else {
      return json({ error: "Person not found" }, { status: 404 });
    }
  }
  return json(persons);
}

export async function POST({ request }) {
  const newPerson = await request.json();
  newPerson.id = persons.length + 1; // Simple ID assignment
  persons.push(newPerson);
  return json(newPerson, { status: 201 });
}

export async function PUT({ request, url }) {
  const id = url.searchParams.get("id");
  if (!id) return json({ error: "ID required" }, { status: 400 });
  const updatedPerson = await request.json();
  const index = persons.findIndex((p) => p.id === Number(id));
  if (index !== -1) {
    persons[index] = { ...persons[index], ...updatedPerson };
    return json(persons[index]);
  } else {
    return json({ error: "Person not found" }, { status: 404 });
  }
}

export async function DELETE({ url }) {
  const id = url.searchParams.get("id");
  if (!id) return json({ error: "ID required" }, { status: 400 });
  const index = persons.findIndex((p) => p.id === Number(id));
  if (index !== -1) {
    const deleted = persons.splice(index, 1);
    return json(deleted[0]);
  } else {
    return json({ error: "Person not found" }, { status: 404 });
  }
}
