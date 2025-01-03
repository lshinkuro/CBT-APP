import { Question } from "../types/question";
import { MockData } from "./Option";

export const MockQuestion: Question = {
    id: "",
    content: "",
    tryoutSectionId: "",
    image: null,
    imageObject: null,
    type: "multiple-choice",
    isActive: true,
    data: MockData,
    createdAt: "",
    tryoutSection: { id: "", title: "", type: "", subType: "", tryout: { id: "", title: "", type: "" } },
};
