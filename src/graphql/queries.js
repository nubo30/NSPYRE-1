/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const showParticipationByUser = `query ShowParticipationByUser($userId: String!) {
  showParticipationByUser(userId: $userId)
}
`;
export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    userId
    name
    username
    lastname
    email
    avatar
    phone
    datetime
    scope
    createContest {
      items {
        id
        category
        createdAt
        timer
      }
      nextToken
    }
    submitPrize {
      items {
        id
        category
        createdAt
      }
      nextToken
    }
    engage {
      items {
        createdAt
      }
      nextToken
    }
    coins
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      userId
      name
      username
      lastname
      email
      avatar
      phone
      datetime
      scope
      createContest {
        nextToken
      }
      submitPrize {
        nextToken
      }
      engage {
        nextToken
      }
      coins
    }
    nextToken
  }
}
`;
export const getCreateContest = `query GetCreateContest($id: ID!) {
  getCreateContest(id: $id) {
    id
    user {
      id
      userId
      name
      username
      lastname
      email
      avatar
      phone
      datetime
      scope
      createContest {
        nextToken
      }
      submitPrize {
        nextToken
      }
      engage {
        nextToken
      }
      coins
    }
    aboutTheUser {
      companyName
      location {
        city
        country
        state
        street
      }
      titleInTheCompany
    }
    category
    general {
      description
      instructions
      nameOfContest
      picture {
        localUrl
        url
        name
        type
        blob
      }
      video {
        localUrl
        url
        name
        type
        blob
      }
    }
    prizes {
      description
      prizeId
      name
      picture {
        localUrl
        url
        name
        type
        blob
      }
      video {
        localUrl
        url
        name
        type
        blob
      }
    }
    createdAt
    timer
    audience {
      items {
        id
        genders
        ages
        categoryContest
        countries
        nacionalities
        regionalIdentity
        sexualities
        maritalStatus
        academicLevelAchieved
        schools
        universities
        musicalGenre
        sports
        parentalCondition
        amountOfChildren
        amountOfSimblings
        politicalPeople
        peopleWhoVote
        ocuppation
        socioeconomicLevel
        rentOrOwnHouse
        rentOrOwnCar
        categoryPrizes
        createdAt
      }
      nextToken
    }
    participants {
      items {
        id
        participantId
        nameUser
        comment
        avatar
        createdAt
      }
      nextToken
    }
  }
}
`;
export const listCreateContests = `query ListCreateContests(
  $filter: ModelCreateContestFilterInput
  $limit: Int
  $nextToken: String
) {
  listCreateContests(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user {
        id
        userId
        name
        username
        lastname
        email
        avatar
        phone
        datetime
        scope
        coins
      }
      aboutTheUser {
        companyName
        titleInTheCompany
      }
      category
      general {
        description
        instructions
        nameOfContest
      }
      prizes {
        description
        prizeId
        name
      }
      createdAt
      timer
      audience {
        nextToken
      }
      participants {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getAudience = `query GetAudience($id: ID!) {
  getAudience(id: $id) {
    createContest {
      id
      user {
        id
        userId
        name
        username
        lastname
        email
        avatar
        phone
        datetime
        scope
        coins
      }
      aboutTheUser {
        companyName
        titleInTheCompany
      }
      category
      general {
        description
        instructions
        nameOfContest
      }
      prizes {
        description
        prizeId
        name
      }
      createdAt
      timer
      audience {
        nextToken
      }
      participants {
        nextToken
      }
    }
    id
    genders
    ages
    categoryContest
    countries
    nacionalities
    regionalIdentity
    sexualities
    maritalStatus
    academicLevelAchieved
    schools
    universities
    musicalGenre
    sports
    parentalCondition
    amountOfChildren
    amountOfSimblings
    politicalPeople
    peopleWhoVote
    ocuppation
    socioeconomicLevel
    rentOrOwnHouse
    rentOrOwnCar
    categoryPrizes
    createdAt
  }
}
`;
export const listAudiences = `query ListAudiences(
  $filter: ModelAudienceFilterInput
  $limit: Int
  $nextToken: String
) {
  listAudiences(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      createContest {
        id
        category
        createdAt
        timer
      }
      id
      genders
      ages
      categoryContest
      countries
      nacionalities
      regionalIdentity
      sexualities
      maritalStatus
      academicLevelAchieved
      schools
      universities
      musicalGenre
      sports
      parentalCondition
      amountOfChildren
      amountOfSimblings
      politicalPeople
      peopleWhoVote
      ocuppation
      socioeconomicLevel
      rentOrOwnHouse
      rentOrOwnCar
      categoryPrizes
      createdAt
    }
    nextToken
  }
}
`;
export const getParticipants = `query GetParticipants($id: ID!) {
  getParticipants(id: $id) {
    id
    participantId
    nameUser
    comment
    video {
      localUrl
      url
      name
      type
      blob
    }
    picture {
      localUrl
      url
      name
      type
      blob
    }
    avatar
    contest {
      id
      user {
        id
        userId
        name
        username
        lastname
        email
        avatar
        phone
        datetime
        scope
        coins
      }
      aboutTheUser {
        companyName
        titleInTheCompany
      }
      category
      general {
        description
        instructions
        nameOfContest
      }
      prizes {
        description
        prizeId
        name
      }
      createdAt
      timer
      audience {
        nextToken
      }
      participants {
        nextToken
      }
    }
    createdAt
  }
}
`;
export const listParticipantss = `query ListParticipantss(
  $filter: ModelParticipantsFilterInput
  $limit: Int
  $nextToken: String
) {
  listParticipantss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      participantId
      nameUser
      comment
      video {
        localUrl
        url
        name
        type
        blob
      }
      picture {
        localUrl
        url
        name
        type
        blob
      }
      avatar
      contest {
        id
        category
        createdAt
        timer
      }
      createdAt
    }
    nextToken
  }
}
`;
export const getContestCategory = `query GetContestCategory($id: ID!) {
  getContestCategory(id: $id) {
    id
    name
    picture
    category
  }
}
`;
export const listContestCategorys = `query ListContestCategorys(
  $filter: ModelContestCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listContestCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      picture
      category
    }
    nextToken
  }
}
`;
export const getPrizesCategory = `query GetPrizesCategory($id: ID!) {
  getPrizesCategory(id: $id) {
    id
    name
    picture
    category
  }
}
`;
export const listPrizesCategorys = `query ListPrizesCategorys(
  $filter: ModelPrizesCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listPrizesCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      picture
      category
    }
    nextToken
  }
}
`;
export const getSubmitPrize = `query GetSubmitPrize($id: ID!) {
  getSubmitPrize(id: $id) {
    id
    user {
      id
      userId
      name
      username
      lastname
      email
      avatar
      phone
      datetime
      scope
      createContest {
        nextToken
      }
      submitPrize {
        nextToken
      }
      engage {
        nextToken
      }
      coins
    }
    aboutTheCompany {
      businessLocation {
        city
        country
        state
        street
      }
      companyName
      socialMediaHandle {
        facebook
        twitter
        instagram
        snapchat
      }
    }
    category
    general {
      price
      nameOfPrize
      description
      instructions {
        msg
        typeContentInstructionsValue
      }
      socialMediaHandle {
        facebook
        twitter
        instagram
        snapchat
      }
      picture {
        localUrl
        url
        name
        type
        blob
      }
      video {
        localUrl
        url
        name
        type
        blob
      }
    }
    createdAt
    delivery {
      description
      socialMediaSelected
      typeOfSocialNetwork
    }
  }
}
`;
export const listSubmitPrizes = `query ListSubmitPrizes(
  $filter: ModelSubmitPrizeFilterInput
  $limit: Int
  $nextToken: String
) {
  listSubmitPrizes(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      user {
        id
        userId
        name
        username
        lastname
        email
        avatar
        phone
        datetime
        scope
        coins
      }
      aboutTheCompany {
        companyName
      }
      category
      general {
        price
        nameOfPrize
        description
      }
      createdAt
      delivery {
        description
        socialMediaSelected
        typeOfSocialNetwork
      }
    }
    nextToken
  }
}
`;
export const getEngage = `query GetEngage($id: ID!) {
  getEngage(id: $id) {
    user {
      id
      userId
      name
      username
      lastname
      email
      avatar
      phone
      datetime
      scope
      createContest {
        nextToken
      }
      submitPrize {
        nextToken
      }
      engage {
        nextToken
      }
      coins
    }
    aboutThePersonality {
      amountOfChildren
      amountOfSimblings
      birthDate
      gender
      location {
        city
        country
        state
        street
      }
      maritalStatus
      nacionality
      parentalCondition
      regionalIdentity
      sexuality
    }
    aboutTheOccupations {
      levelAchivied
      occupation
      rentOrOwnCar
      rentOrOwnHouse
      schools
      university
      socioeconomicLevel
    }
    interests {
      categoryContest
      categoryPrize
      musicalGenre
      sports
      political
      vote
    }
    createdAt
  }
}
`;
export const listEngages = `query ListEngages(
  $filter: ModelEngageFilterInput
  $limit: Int
  $nextToken: String
) {
  listEngages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      user {
        id
        userId
        name
        username
        lastname
        email
        avatar
        phone
        datetime
        scope
        coins
      }
      aboutThePersonality {
        amountOfChildren
        amountOfSimblings
        birthDate
        gender
        maritalStatus
        nacionality
        parentalCondition
        regionalIdentity
        sexuality
      }
      aboutTheOccupations {
        levelAchivied
        occupation
        rentOrOwnCar
        rentOrOwnHouse
        schools
        university
        socioeconomicLevel
      }
      interests {
        categoryContest
        categoryPrize
        musicalGenre
        sports
        political
        vote
      }
      createdAt
    }
    nextToken
  }
}
`;
