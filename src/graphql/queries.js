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
