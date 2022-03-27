const local = true;
const path = local ? 'http://localhost:8080/v1/profiles' : '';

export async function createProfile() {
  return fetch(`${path}/`, { method: 'POST' })
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

export async function getProfileById(profileId: string) {
  return fetch(`${path}/${profileId}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

export async function getFriendsForProfile(profileId: string) {
  return fetch(`${path}/${profileId}/friends`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}
