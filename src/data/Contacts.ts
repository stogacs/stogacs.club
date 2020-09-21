export interface Link {
  name: string;
  url: string;
  icon:
    | {
        set: string;
        name: string;
      }
    | string;
}

export interface Person {
  name: string;
  position: string;
  photo: any;
  links: Link[];
}

export interface Contacts {
  links: Link[];
  people: Person[];
  code: string;
}

export class ContactsService {
  async fetch(): Promise<Contacts> {
    const data: ContactsJson = (await import("./load/contacts.json")).default;

    const peoplePromises = data.people.map((person) => {
      if (person.photo === "") {
        return {
          name: person.name,
          position: person.position,
          photo: null,
          links: person.links,
        };
      }
      return import(/* */ `./load/${person.photo}`).then((imp) => {
        return {
          name: person.name,
          position: person.position,
          photo: imp.default,
          links: person.links,
        };
      });
    });

    const people = await Promise.all(peoplePromises);

    return {
      links: data.links,
      people: people,
      code: data.code,
    };
  }
}

interface ContactsJson {
  links: Link[];
  people: PersonJson[];
  code: string;
}

interface PersonJson {
  name: string;
  position: string;
  photo: string;
  links: Link[];
}