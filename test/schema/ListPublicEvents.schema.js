const listPublicEventsSchema = {
  items: {
    id: '/items',
    properties: {
      actor: {
        id: '/items/properties/actor',
        properties: {
          avatar_url: {
            id: '/items/properties/actor/properties/avatar_url',
            type: 'string'
          },
          display_login: {
            id: '/items/properties/actor/properties/display_login',
            type: 'string'
          },
          gravatar_id: {
            id: '/items/properties/actor/properties/gravatar_id',
            type: 'string'
          },
          id: {
            id: '/items/properties/actor/properties/id',
            type: 'integer'
          },
          login: {
            id: '/items/properties/actor/properties/login',
            type: 'string'
          },
          url: {
            id: '/items/properties/actor/properties/url',
            type: 'string'
          }
        },
        type: 'object'
      },
      created_at: {
        id: '/items/properties/created_at',
        type: 'string'
      },
      id: {
        id: '/items/properties/id',
        type: 'string'
      },
      org: {
        id: '/items/properties/org',
        properties: {
          avatar_url: {
            id: '/items/properties/org/properties/avatar_url',
            type: 'string'
          },
          gravatar_id: {
            id: '/items/properties/org/properties/gravatar_id',
            type: 'string'
          },
          id: {
            id: '/items/properties/org/properties/id',
            type: 'integer'
          },
          login: {
            id: '/items/properties/org/properties/login',
            type: 'string'
          },
          url: {
            id: '/items/properties/org/properties/url',
            type: 'string'
          }
        },
        type: 'object'
      },
      payload: {
        id: '/items/properties/payload',
        properties: {},
        type: 'object'
      },
      public: {
        id: '/items/properties/public',
        type: 'boolean'
      },
      repo: {
        id: '/items/properties/repo',
        properties: {
          id: {
            id: '/items/properties/repo/properties/id',
            type: 'integer'
          },
          name: {
            id: '/items/properties/repo/properties/name',
            type: 'string'
          },
          url: {
            id: '/items/properties/repo/properties/url',
            type: 'string'
          }
        },
        type: 'object'
      },
      type: {
        id: '/items/properties/type',
        type: 'string',
        enum: ['DeleteEvent', 'PushEvent', 'CreateEvent', 'IssueCommentEvent', 'WatchEvent',
          'PullRequestEvent', 'PullRequestReviewCommentEvent', 'IssuesEvent', 'ForkEvent',
          'MemberEvent', 'GollumEvent']
      }
    },
    type: 'object'
  },
  type: 'array'
};

exports.listPublicEventsSchema = listPublicEventsSchema;
