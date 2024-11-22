import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="min-h-screen">
      {/* How SharpTint Works Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              How SharpTint Works
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create an Account & Choose Subscription</h3>
              <p className="text-gray-600">
                Sign up and select a subscription package that suits your business needs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Download & Log In</h3>
              <p className="text-gray-600">
                Download the SharpTint software and log in to your account.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Vehicle & Send Cut Job</h3>
              <p className="text-gray-600">
                Select the vehicle's make and model, and initiate the tinting process.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What Our Users Say Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">AW</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Alex Wonski</h4>
                  <p className="text-gray-600">Monarch PPF</p>
                </div>
              </div>
              <p className="text-gray-700">
                "SharpTint has revolutionized my workflow. The precise patterns save me hours on each job."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">MA</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Michael Alen</h4>
                  <p className="text-gray-600">Express Tints</p>
                </div>
              </div>
              <p className="text-gray-700">
                "SharpTint has been a game changer for our business. The patterns are accurate and the software is easy to use."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-xl font-bold text-blue-600">RL</span>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Ron Levine </h4>
                  <p className="text-gray-600">Luminous Automotive</p>
                </div>
              </div>
              <p className="text-gray-700">
                "This software is priced right and the support is great. I would recommend this to anyone in the tinting business."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About; 