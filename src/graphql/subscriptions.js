// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
    notificationToken
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
    notificationToken
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
    notificationToken
  }
}
`;
export const onCreateCreateContest = `subscription OnCreateCreateContest {
  onCreateCreateContest {
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
      notificationToken
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
export const onUpdateCreateContest = `subscription OnUpdateCreateContest {
  onUpdateCreateContest {
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
      notificationToken
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
export const onDeleteCreateContest = `subscription OnDeleteCreateContest {
  onDeleteCreateContest {
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
      notificationToken
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
export const onCreateAudience = `subscription OnCreateAudience {
  onCreateAudience {
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
        notificationToken
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
export const onUpdateAudience = `subscription OnUpdateAudience {
  onUpdateAudience {
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
        notificationToken
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
export const onDeleteAudience = `subscription OnDeleteAudience {
  onDeleteAudience {
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
        notificationToken
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
export const onCreateParticipants = `subscription OnCreateParticipants {
  onCreateParticipants {
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
        notificationToken
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
export const onUpdateParticipants = `subscription OnUpdateParticipants {
  onUpdateParticipants {
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
        notificationToken
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
export const onDeleteParticipants = `subscription OnDeleteParticipants {
  onDeleteParticipants {
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
        notificationToken
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
export const onCreateContestCategory = `subscription OnCreateContestCategory {
  onCreateContestCategory {
    id
    name
    picture
    category
  }
}
`;
export const onUpdateContestCategory = `subscription OnUpdateContestCategory {
  onUpdateContestCategory {
    id
    name
    picture
    category
  }
}
`;
export const onDeleteContestCategory = `subscription OnDeleteContestCategory {
  onDeleteContestCategory {
    id
    name
    picture
    category
  }
}
`;
export const onCreatePrizesCategory = `subscription OnCreatePrizesCategory {
  onCreatePrizesCategory {
    id
    name
    picture
    category
  }
}
`;
export const onUpdatePrizesCategory = `subscription OnUpdatePrizesCategory {
  onUpdatePrizesCategory {
    id
    name
    picture
    category
  }
}
`;
export const onDeletePrizesCategory = `subscription OnDeletePrizesCategory {
  onDeletePrizesCategory {
    id
    name
    picture
    category
  }
}
`;
export const onCreateSubmitPrize = `subscription OnCreateSubmitPrize {
  onCreateSubmitPrize {
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
      notificationToken
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
export const onUpdateSubmitPrize = `subscription OnUpdateSubmitPrize {
  onUpdateSubmitPrize {
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
      notificationToken
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
export const onDeleteSubmitPrize = `subscription OnDeleteSubmitPrize {
  onDeleteSubmitPrize {
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
      notificationToken
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
export const onCreateEngage = `subscription OnCreateEngage {
  onCreateEngage {
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
      notificationToken
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
export const onUpdateEngage = `subscription OnUpdateEngage {
  onUpdateEngage {
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
      notificationToken
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
export const onDeleteEngage = `subscription OnDeleteEngage {
  onDeleteEngage {
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
      notificationToken
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
export const onCreateNotifications = `subscription OnCreateNotifications {
  onCreateNotifications {
    id
    idUSerFrom
    idUserTo
    userFrom
    userTo
    expoPushToken
    messageTitle
    messageBody
    JSONdata
    createdAt
    expirationDateWeek
    avatar
  }
}
`;
export const onUpdateNotifications = `subscription OnUpdateNotifications {
  onUpdateNotifications {
    id
    idUSerFrom
    idUserTo
    userFrom
    userTo
    expoPushToken
    messageTitle
    messageBody
    JSONdata
    createdAt
    expirationDateWeek
    avatar
  }
}
`;
export const onDeleteNotifications = `subscription OnDeleteNotifications {
  onDeleteNotifications {
    id
    idUSerFrom
    idUserTo
    userFrom
    userTo
    expoPushToken
    messageTitle
    messageBody
    JSONdata
    createdAt
    expirationDateWeek
    avatar
  }
}
`;
