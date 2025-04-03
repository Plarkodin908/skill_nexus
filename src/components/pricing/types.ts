
export type PlanType = "Free" | "Lite" | "Pro Learner" | "Educator";

export type PlanFeature = {
  name: string;
  free: boolean;
  lite: boolean;
  pro: boolean;
  educator: boolean;
  description?: string;
};

export type PlanDefinition = {
  name: PlanType;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  limitations: PlanFeature[];
  cta: string;
  highlighted: boolean;
  disabled: boolean;
  tagline?: string;
};
