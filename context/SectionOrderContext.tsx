import { createContext, useContext, useState, useEffect } from "react";

export type SectionType =
  | "summary"
  | "skills"
  | "experience"
  | "education"
  | "projects";

interface Section {
  id: SectionType;
  title: string;
  visible: boolean;
}

const defaultSection: Section[] = [
  { id: "summary", title: "Professtional Summary", visible: true },
  { id: "skills", title: "Skills", visible: true },
  { id: "experience", title: "Word Experience", visible: true },
  { id: "projects", title: "Projects", visible: true },
  { id: "education", title: "Education", visible: true },
];

interface SectionOrderContextType {
  sections: Section[];
  setSections: (section: Section[]) => void;
  toggleSection: (id: SectionType) => void;
  isSectionVisible: (id: SectionType) => boolean;
}

const SectionOrderContext = createContext<SectionOrderContextType | undefined>(
  undefined,
);

export const SectionOrderProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sections, setSections] = useState<Section[]>(defaultSection);

  useEffect(() => {
    const savedSection = localStorage.getItem("sectionsOrder");
    if (savedSection) {
      setSections(JSON.parse(savedSection));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("sectionsOrder", JSON.stringify(sections));
  }, [sections]);

  const toggleSection = (id: SectionType) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, visible: !section.visible } : section,
      ),
    );
  };

  const isSectionVisible = (id: SectionType) => {
    return sections.find((section) => section.id === id)?.visible ?? true;
  };

  return (
    <SectionOrderContext.Provider
      value={{ sections, setSections, toggleSection, isSectionVisible }}
    >
      {children}
    </SectionOrderContext.Provider>
  );
};

export const useSectionOrder = () => {
  const context = useContext(SectionOrderContext);
  if (context === undefined) {
    throw new Error(
      "useSectionOrder must be use within a SectionOrderProvider",
    );
  }
  return context;
};
