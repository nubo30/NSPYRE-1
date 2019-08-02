// eslint-disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
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
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
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
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
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
  }
}
`;
export const createCreateContest = `mutation CreateCreateContest($input: CreateCreateContestInput!) {
  createCreateContest(input: $input) {
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
      price
    }
    createdAt
    timer
    audience {
      items {
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
}
`;
export const updateCreateContest = `mutation UpdateCreateContest($input: UpdateCreateContestInput!) {
  updateCreateContest(input: $input) {
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
      price
    }
    createdAt
    timer
    audience {
      items {
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
}
`;
export const deleteCreateContest = `mutation DeleteCreateContest($input: DeleteCreateContestInput!) {
  deleteCreateContest(input: $input) {
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
      price
    }
    createdAt
    timer
    audience {
      items {
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
}
`;
export const createAudience = `mutation CreateAudience($input: CreateAudienceInput!) {
  createAudience(input: $input) {
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
        price
      }
      createdAt
      timer
      audience {
        nextToken
      }
    }
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
export const updateAudience = `mutation UpdateAudience($input: UpdateAudienceInput!) {
  updateAudience(input: $input) {
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
        price
      }
      createdAt
      timer
      audience {
        nextToken
      }
    }
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
export const deleteAudience = `mutation DeleteAudience($input: DeleteAudienceInput!) {
  deleteAudience(input: $input) {
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
        price
      }
      createdAt
      timer
      audience {
        nextToken
      }
    }
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
export const createContestCategory = `mutation CreateContestCategory($input: CreateContestCategoryInput!) {
  createContestCategory(input: $input) {
    id
    name
    picture
    category
  }
}
`;
export const updateContestCategory = `mutation UpdateContestCategory($input: UpdateContestCategoryInput!) {
  updateContestCategory(input: $input) {
    id
    name
    picture
    category
  }
}
`;
export const deleteContestCategory = `mutation DeleteContestCategory($input: DeleteContestCategoryInput!) {
  deleteContestCategory(input: $input) {
    id
    name
    picture
    category
  }
}
`;
export const createPrizesCategory = `mutation CreatePrizesCategory($input: CreatePrizesCategoryInput!) {
  createPrizesCategory(input: $input) {
    id
    name
    picture
    category
  }
}
`;
export const updatePrizesCategory = `mutation UpdatePrizesCategory($input: UpdatePrizesCategoryInput!) {
  updatePrizesCategory(input: $input) {
    id
    name
    picture
    category
  }
}
`;
export const deletePrizesCategory = `mutation DeletePrizesCategory($input: DeletePrizesCategoryInput!) {
  deletePrizesCategory(input: $input) {
    id
    name
    picture
    category
  }
}
`;
