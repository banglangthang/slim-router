// Provider definitions

// Free Providers
export const FREE_PROVIDERS = {
  opencode: { id: "opencode", alias: "oc", name: "OpenCode Free", icon: "terminal", color: "#E87040", textIcon: "OC", noAuth: true, passthroughModels: true, modelsFetcher: { url: "https://opencode.ai/zen/v1/models", type: "opencode-free" } },
};

// Free Tier Providers (empty)
export const FREE_TIER_PROVIDERS = {};

// OAuth Providers
export const OAUTH_PROVIDERS = {
  github: { id: "github", alias: "gh", name: "GitHub Copilot", icon: "code", color: "#333333", website: "https://github.com/features/copilot", notice: { signupUrl: "https://github.com/features/copilot" } },
};

// API Key Providers
export const APIKEY_PROVIDERS = {
  "opencode-go": { id: "opencode-go", alias: "ocg", name: "OpenCode Go", icon: "terminal", color: "#E87040", textIcon: "OC", website: "https://opencode.ai/auth", notice: { text: "OpenCode Go subscription: $5/mo (then $10/mo).", apiKeyUrl: "https://opencode.ai/auth" } },
};

// Web Cookie Providers (empty)
export const WEB_COOKIE_PROVIDERS = {};

export const OPENAI_COMPATIBLE_PREFIX = "openai-compatible-";
export const ANTHROPIC_COMPATIBLE_PREFIX = "anthropic-compatible-";
export const CUSTOM_EMBEDDING_PREFIX = "custom-embedding-";

export function isOpenAICompatibleProvider(providerId) {
  return typeof providerId === "string" && providerId.startsWith(OPENAI_COMPATIBLE_PREFIX);
}

export function isAnthropicCompatibleProvider(providerId) {
  return typeof providerId === "string" && providerId.startsWith(ANTHROPIC_COMPATIBLE_PREFIX);
}

export function isCustomEmbeddingProvider(providerId) {
  return typeof providerId === "string" && providerId.startsWith(CUSTOM_EMBEDDING_PREFIX);
}

export const AI_PROVIDERS = { ...FREE_PROVIDERS, ...FREE_TIER_PROVIDERS, ...OAUTH_PROVIDERS, ...APIKEY_PROVIDERS, ...WEB_COOKIE_PROVIDERS };

export const AUTH_METHODS = {
  oauth: { id: "oauth", name: "OAuth", icon: "lock" },
  apikey: { id: "apikey", name: "API Key", icon: "key" },
  cookie: { id: "cookie", name: "Browser Cookie", icon: "cookie" },
};

export function getProviderByAlias(alias) {
  for (const provider of Object.values(AI_PROVIDERS)) {
    if (provider.alias === alias || provider.id === alias) {
      return provider;
    }
  }
  return null;
}

export function resolveProviderId(aliasOrId) {
  const provider = getProviderByAlias(aliasOrId);
  return provider?.id || aliasOrId;
}

export function getProviderAlias(providerId) {
  const provider = AI_PROVIDERS[providerId];
  return provider?.alias || providerId;
}

export const ALIAS_TO_ID = Object.values(AI_PROVIDERS).reduce((acc, p) => {
  acc[p.alias] = p.id;
  return acc;
}, {});

export const ID_TO_ALIAS = Object.values(AI_PROVIDERS).reduce((acc, p) => {
  acc[p.id] = p.alias;
  return acc;
}, {});

export function getProvidersByKind(kind) {
  return Object.values(AI_PROVIDERS)
    .filter((p) => {
      const kinds = p.serviceKinds ?? ["llm"];
      if (!kinds.includes(kind)) return false;
      if (p.hidden) return false;
      if (p.hiddenKinds?.includes(kind)) return false;
      return true;
    })
    .sort((a, b) => (a.mediaPriority ?? 100) - (b.mediaPriority ?? 100));
}

// Providers that support usage/quota API
export const USAGE_SUPPORTED_PROVIDERS = [
  "github",
];

export const USAGE_APIKEY_PROVIDERS = [];
