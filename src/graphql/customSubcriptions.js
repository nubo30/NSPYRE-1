export const listenUserAndAvatar = `subscription listenUserAndAvatar {
  onCreateAvatar {
    id
    user {
      id
      typeUser
      username
      name
      email
      avatar {
        nextToken
      }
      formSubmitAPrizes {
        nextToken
      }
      formCreateAContest {
        nextToken
      }
      formEngage {
        nextToken
      }
      formPromoteContest {
        nextToken
      }
      version
    }
    title
    url
    createAt
    version
  }
},
  onUpdateUser {
    id
    typeUser
    username
    name
    email
    avatar {
      items {
        id
        title
        url
        createAt
        version
      }
      nextToken
    }
    formSubmitAPrizes {
      items {
        id
        phone
        companyName
        typeOfPrize
        pointsEarned
        version
      }
      nextToken
    }
    formCreateAContest {
      items {
        id
        phone
        companyName
        occupationInTheCompany
        nameOfContest
        pointsEarned
        version
      }
      nextToken
    }
    formEngage {
      items {
        id
        phone
        amountOfChildren
        amountOfSiblings
        areYouPolitical
        doYouVote
        birthDate
        gender
        academicLevelAchieved
        haveACar
        howDoYouIdentify
        levelAchieved
        musicYouLike
        nacionality
        parents
        pointsEarned
        relationshipStatus
        schoolNameCollege
        schoolNameHSchool
        schoolNameOthers
        sexualOrientation
        socioeconomicLevel
        sportsYouLike
        sportsYouPlay
        titleInTheCompany
        typeOfHousing
        whatKindOfPrizeDoYouLike
        version
      }
      nextToken
    }
    formPromoteContest {
      items {
        id
        age
        amountOfPeople
        demographicRegion
        education
        gender
        location
        version
      }
      nextToken
    }
    version
  }
}
`;