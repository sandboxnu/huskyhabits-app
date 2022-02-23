const local = true;
const path = local ? 'http://localhost:8080/v1/users' : '';

export async function getUserById(userId: string) {
  return fetch(`${path}/${userId}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

export async function getChallengesForUser(userId: string) {
  return fetch(`${path}/${userId}/challenges`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

export async function getFriendRequestsForUser(userId: string) {
  return fetch(`${path}/${userId}/friend_requests`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}

export async function getAvatarForUser(
  userId: string,
  size: 'sm' | 'md' | 'lg',
) {
  return fetch(`${path}/users/${userId}/avatar?size=${size}`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}
