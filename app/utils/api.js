import { Profiler } from "react";

export function fetchPopularRepos(language) {
  const endpoint = encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  return fetch(endpoint)
  .then((response) => response.json())
  .then((data) => {
    if(!data.items){
      throw new Error(data.message);
    }
    return data.items;
  })
}

function getErrorMsg(message, username) {
  if (message === "Not Found") {
    return `${username} doesn't exist`
  }
  return message;
}

function gitProfile (username) {
  return fetch(`https://api.github.com/users/${username}`)
  .then((res) => res.json())
  .then((profile) => {
    if (profile.message){
      throw new Error(getErrorMsg(profile.message, username))
    }
    return profile;
  })
}

function gitRepos (username) {
  return fetch(`https://api.github.com/users/${username}/repos?per_page=100`)
  .then((res) => res.json())
  .then((repos) => {
    if(repos.message) {
      throw new Error(getErrorMsg(repos.message, username))

    }
    return repos;
    
  })
}

function getStarCount(repos) {
  console.log("repos", repos)
  return repos.reduce((count, {stargazers_count})=> { 
    return count + stargazers_count; }, 0 )
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos)
}

function getUserData (player) {
  return Promise.all([
    gitProfile(player), gitRepos(player)
  ]).then(([profile, repos]) => ({
    profile,
    score: calculateScore(profile.followers, repos)
  })) 
}

function sortPlayers(players){
  return players.sort((a,b) => b.score - a.score);
}

export function battle (players) {
  return Promise.all([ getUserData(players[0]), getUserData(players[1])])
  .then(sortPlayers)
}