// eslint-disable
// this is an auto generated file. This will be overwritten

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
      nextToken
    }
    submitPrize {
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
          createContest {
            nextToken
          }
          submitPrize {
            nextToken
          }
          engage {
            nextToken
          }
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
      nextToken
    }
    engage {
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
          createContest {
            nextToken
          }
          submitPrize {
            nextToken
          }
          engage {
            nextToken
          }
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
        nextToken
      }
      submitPrize {
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
      engage {
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
        nextToken
      }
      submitPrize {
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
      engage {
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
        nextToken
      }
      submitPrize {
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
      engage {
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
        nextToken
      }
      submitPrize {
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
      engage {
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
    aboutThePersonality {
      amountOfChildren
      amountOfSimblings
      birthDate
      gender
      location {
        born {
          city
          country
        }
        currentPlace {
          city
          country
        }
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
      }
      aboutThePersonality {
        amountOfChildren
        amountOfSimblings
        birthDate
        gender
        location {
          born {
            city
            country
          }
          currentPlace {
            city
            country
          }
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
    nextToken
  }
}
`;
