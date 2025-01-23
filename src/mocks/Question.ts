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
    tryoutSection: { id: "", code: "", title: "", type: "", tryout: { id: "", title: "", type: "" } },
};
