import Modal from "@/components/shared/modal";
import {
  useState,
  useCallback,
  useMemo,
} from "react";

const DemoModal = ({
  showDemoModal,
  setShowDemoModal,
}) => {
  return (
    <Modal showModal={showDemoModal} setShowModal={setShowDemoModal}>
      <div className="w-full overflow-hidden md:max-w-md md:rounded-2xl md:border md:border-gray-100 md:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <a href="https://precedent.dev">
            image
          </a>
          <h3 className="font-display text-2xl font-bold">Precedent</h3>
          <p className="text-sm text-gray-500">
            Precedent is an opinionated collection of components, hooks, and
            utilities for your Next.js project.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export function useSignupModal() {
  const [showSignupModal, setShowSignupModal] = useState(false);

  const SignupModalCallback = useCallback(() => {
    return (
      <DemoModal
        showDemoModal={showSignupModal}
        setShowDemoModal={setShowSignupModal}
      />
    );
  }, [showSignupModal, setShowSignupModal]);

  return useMemo(
    () => ({ setShowSignupModal, SignupModal: SignupModalCallback }),
    [setShowSignupModal, SignupModalCallback],
  );
}
