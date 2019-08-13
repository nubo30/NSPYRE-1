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
        participants {
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
        participants {
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
        participants {
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
            participants {
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
        nextToken
      }
      participants {
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
            participants {
              nextToken
            }
          }
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
            participants {
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
        nextToken
      }
      participants {
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
            participants {
              nextToken
            }
          }
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
            participants {
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
        nextToken
      }
      participants {
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
            participants {
              nextToken
            }
          }
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
export const createParticipants = `mutation CreateParticipants($input: CreateParticipantsInput!) {
  createParticipants(input: $input) {
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
            participants {
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
        nextToken
      }
      participants {
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
            participants {
              nextToken
            }
          }
          createdAt
        }
        nextToken
      }
    }
    createdAt
  }
}
`;
export const updateParticipants = `mutation UpdateParticipants($input: UpdateParticipantsInput!) {
  updateParticipants(input: $input) {
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
            participants {
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
        nextToken
      }
      participants {
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
            participants {
              nextToken
            }
          }
          createdAt
        }
        nextToken
      }
    }
    createdAt
  }
}
`;
export const deleteParticipants = `mutation DeleteParticipants($input: DeleteParticipantsInput!) {
  deleteParticipants(input: $input) {
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
            participants {
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
        nextToken
      }
      participants {
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
            participants {
              nextToken
            }
          }
          createdAt
        }
        nextToken
      }
    }
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
export const createSubmitPrize = `mutation CreateSubmitPrize($input: CreateSubmitPrizeInput!) {
  createSubmitPrize(input: $input) {
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
export const updateSubmitPrize = `mutation UpdateSubmitPrize($input: UpdateSubmitPrizeInput!) {
  updateSubmitPrize(input: $input) {
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
export const deleteSubmitPrize = `mutation DeleteSubmitPrize($input: DeleteSubmitPrizeInput!) {
  deleteSubmitPrize(input: $input) {
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
export const createEngage = `mutation CreateEngage($input: CreateEngageInput!) {
  createEngage(input: $input) {
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
export const updateEngage = `mutation UpdateEngage($input: UpdateEngageInput!) {
  updateEngage(input: $input) {
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
export const deleteEngage = `mutation DeleteEngage($input: DeleteEngageInput!) {
  deleteEngage(input: $input) {
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
