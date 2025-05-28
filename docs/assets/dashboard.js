// Risk Simulator Dashboard - Advanced JavaScript with Animations

// Tab Navigation
function openTab(evt, tabName) {
    // Hide all tab content
    var tabContent = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContent.length; i++) {
        tabContent[i].classList.remove("active");
    }

    // Remove active class from all tab buttons
    var tabButtons = document.getElementsByClassName("tab-button");
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    // Show the selected tab and mark its button as active
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
    
    // Trigger animations for newly visible tab
    const animatedElements = document.querySelectorAll(`#${tabName} .animate-fade-in, #${tabName} .animate-slide-up, #${tabName} .animate-slide-in-left, #${tabName} .animate-slide-in-right, #${tabName} .animate-scale`);
    
    animatedElements.forEach((element, index) => {
        // Reset animation
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        
        // Re-add animation with staggered delay
        const delay = index * 0.1;
        const animationClass = Array.from(element.classList).find(cls => cls.startsWith('animate-'));
        
        if (animationClass === 'animate-fade-in') {
            element.style.animation = `fadeIn 0.8s ease ${delay}s forwards`;
        } else if (animationClass === 'animate-slide-up') {
            element.style.animation = `slideUp 0.8s ease ${delay}s forwards`;
        } else if (animationClass === 'animate-slide-in-left') {
            element.style.animation = `slideInLeft 0.8s ease ${delay}s forwards`;
        } else if (animationClass === 'animate-slide-in-right') {
            element.style.animation = `slideInRight 0.8s ease ${delay}s forwards`;
        } else if (animationClass === 'animate-scale') {
            element.style.animation = `scale 0.8s ease ${delay}s forwards`;
        }
    });
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Load data and initialize charts
    initializeOverviewCharts();
    initializeSimulationCharts();
    initializeDataExplorer();
    
    // Set up event listeners for range inputs with animated value display
    document.getElementById('pred-trust-score').addEventListener('input', function() {
        const valueDisplay = document.getElementById('trust-score-value');
        valueDisplay.textContent = this.value;
        valueDisplay.classList.add('pulse-animation');
        setTimeout(() => valueDisplay.classList.remove('pulse-animation'), 500);
    });
    
    document.getElementById('pred-market-volatility').addEventListener('input', function() {
        const valueDisplay = document.getElementById('volatility-value');
        valueDisplay.textContent = this.value;
        valueDisplay.classList.add('pulse-animation');
        setTimeout(() => valueDisplay.classList.remove('pulse-animation'), 500);
    });
    
    document.getElementById('risk-tolerance').addEventListener('input', function() {
        const valueDisplay = document.getElementById('risk-tolerance-value');
        valueDisplay.textContent = this.value;
        valueDisplay.classList.add('pulse-animation');
        setTimeout(() => valueDisplay.classList.remove('pulse-animation'), 500);
    });
    
    document.getElementById('sim-volatility').addEventListener('input', function() {
        const valueDisplay = document.getElementById('sim-volatility-value');
        valueDisplay.textContent = this.value;
        valueDisplay.classList.add('pulse-animation');
        setTimeout(() => valueDisplay.classList.remove('pulse-animation'), 500);
    });
    
    // Add animation to creator section
    const creatorSection = document.querySelector('.creator-section');
    if (creatorSection) {
        window.addEventListener('scroll', function() {
            const rect = creatorSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                creatorSection.classList.add('visible');
            }
        });
    }
    
    // Add parallax effect to header
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            header.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
        });
    }
});

// Overview Tab Charts with Enhanced Visuals
function initializeOverviewCharts() {
    // Default Trust Score Default Rate Chart
    var trustLabels = ['0-0.2', '0.2-0.4', '0.4-0.6', '0.6-0.8', '0.8-1.0'];
    var defaultRates = [18.5, 12.3, 7.8, 4.2, 1.5];
    
    var trustDefaultChart = Plotly.newPlot('overview-trust-default', [{
        x: trustLabels,
        y: defaultRates,
        type: 'bar',
        marker: {
            color: defaultRates,
            colorscale: [
                [0, 'rgba(0, 214, 143, 0.8)'],
                [0.5, 'rgba(255, 170, 0, 0.8)'],
                [1, 'rgba(255, 56, 96, 0.8)']
            ]
        },
        hoverinfo: 'y+text',
        hovertext: defaultRates.map(rate => `${rate}% default rate`),
        hoverlabel: {
            bgcolor: 'rgba(0, 0, 0, 0.8)',
            font: { color: 'white' }
        }
    }], {
        title: {
            text: 'Default Rate by Trust Score',
            font: { size: 18, color: '#2c3e50' }
        },
        xaxis: { 
            title: 'Trust Score',
            titlefont: { size: 14, color: '#6c757d' }
        },
        yaxis: { 
            title: 'Default Rate (%)',
            titlefont: { size: 14, color: '#6c757d' }
        },
        plot_bgcolor: 'rgba(255, 255, 255, 0)',
        paper_bgcolor: 'rgba(255, 255, 255, 0)',
        margin: { l: 50, r: 30, t: 50, b: 50 },
        transition: {
            duration: 500,
            easing: 'cubic-in-out'
        },
        animations: [{
            frame: { duration: 500 },
            transition: { duration: 500, easing: 'cubic-in-out' }
        }]
    });
    
    // Loan Amount Distribution Chart with Animation
    var loanAmounts = [];
    for (var i = 0; i < 1000; i++) {
        loanAmounts.push(Math.exp(Math.random() * Math.log(100000)));
    }
    
    var loanAmountChart = Plotly.newPlot('overview-loan-amount', [{
        x: loanAmounts,
        type: 'histogram',
        nbinsx: 30,
        marker: {
            color: 'rgba(0, 102, 204, 0.7)',
            line: {
                color: 'rgba(0, 102, 204, 1)',
                width: 1
            }
        },
        hoverlabel: {
            bgcolor: 'rgba(0, 0, 0, 0.8)',
            font: { color: 'white' }
        }
    }], {
        title: {
            text: 'Distribution of Loan Amounts',
            font: { size: 18, color: '#2c3e50' }
        },
        xaxis: { 
            title: 'Loan Amount ($)',
            titlefont: { size: 14, color: '#6c757d' },
            type: 'log'
        },
        yaxis: { 
            title: 'Count',
            titlefont: { size: 14, color: '#6c757d' }
        },
        plot_bgcolor: 'rgba(255, 255, 255, 0)',
        paper_bgcolor: 'rgba(255, 255, 255, 0)',
        margin: { l: 50, r: 30, t: 50, b: 50 },
        transition: {
            duration: 500,
            easing: 'cubic-in-out'
        }
    });
    
    // Default Rate by Loan Size Chart with Enhanced Visuals
    var sizeLabels = ['0-5K', '5K-10K', '10K-20K', '20K-50K', '50K+'];
    var sizeDefaultRates = [5.2, 6.8, 8.3, 10.5, 15.7];
    
    var sizeDefaultChart = Plotly.newPlot('overview-size-default', [{
        x: sizeLabels,
        y: sizeDefaultRates,
        type: 'bar',
        marker: {
            color: sizeDefaultRates,
            colorscale: [
                [0, 'rgba(0, 214, 143, 0.8)'],
                [0.5, 'rgba(255, 170, 0, 0.8)'],
                [1, 'rgba(255, 56, 96, 0.8)']
            ]
        },
        hoverinfo: 'y+text',
        hovertext: sizeDefaultRates.map(rate => `${rate}% default rate`),
        hoverlabel: {
            bgcolor: 'rgba(0, 0, 0, 0.8)',
            font: { color: 'white' }
        }
    }], {
        title: {
            text: 'Default Rate by Loan Size',
            font: { size: 18, color: '#2c3e50' }
        },
        xaxis: { 
            title: 'Loan Amount',
            titlefont: { size: 14, color: '#6c757d' }
        },
        yaxis: { 
            title: 'Default Rate (%)',
            titlefont: { size: 14, color: '#6c757d' }
        },
        plot_bgcolor: 'rgba(255, 255, 255, 0)',
        paper_bgcolor: 'rgba(255, 255, 255, 0)',
        margin: { l: 50, r: 30, t: 50, b: 50 },
        transition: {
            duration: 500,
            easing: 'cubic-in-out'
        }
    });
}

// Credit Risk Prediction with Enhanced Animation
function predictDefault() {
    // Get input values
    var trustScore = parseFloat(document.getElementById('pred-trust-score').value);
    var loanAmount = parseFloat(document.getElementById('pred-loan-amount').value);
    var interestRate = parseFloat(document.getElementById('pred-interest-rate').value) / 100;
    var collateralRatio = parseFloat(document.getElementById('pred-collateral-ratio').value);
    var marketVolatility = parseFloat(document.getElementById('pred-market-volatility').value);
    
    // Simple model for demonstration (in a real app, this would call an API)
    var defaultProb = 0.5 - (trustScore * 0.4) + (loanAmount / 100000 * 0.1) + 
                     (interestRate * 0.5) - (collateralRatio * 0.1) + (marketVolatility * 0.5);
    
    // Ensure probability is between 0 and 1
    defaultProb = Math.max(0, Math.min(1, defaultProb));
    
    // Update the prediction result with animation
    var resultDiv = document.getElementById('prediction-result');
    resultDiv.innerHTML = `
        <h4>Default Probability: ${(defaultProb * 100).toFixed(2)}%</h4>
        <div class="risk-meter-container">
            <div class="risk-meter">
                <div class="risk-meter-fill" style="width: 0%"></div>
            </div>
            <div class="risk-labels">
                <span class="risk-label-low">Low Risk</span>
                <span class="risk-label-medium">Medium Risk</span>
                <span class="risk-label-high">High Risk</span>
            </div>
        </div>
    `;
    
    // Animate the risk meter fill
    setTimeout(() => {
        const riskMeterFill = resultDiv.querySelector('.risk-meter-fill');
        riskMeterFill.style.width = `${defaultProb * 100}%`;
    }, 100);
    
    // Update the explanation with animated appearance
    var explanationDiv = document.getElementById('prediction-explanation');
    explanationDiv.innerHTML = '';
    
    setTimeout(() => {
        explanationDiv.innerHTML = `
            <p>The default probability is influenced by the following factors:</p>
            <ul>
                <li><strong>Trust Score:</strong> ${trustScore} (${trustScore < 0.5 ? 'Negative' : 'Positive'} impact)</li>
                <li><strong>Loan Amount:</strong> $${loanAmount.toLocaleString()} (${loanAmount > 20000 ? 'Negative' : 'Neutral'} impact)</li>
                <li><strong>Interest Rate:</strong> ${(interestRate * 100).toFixed(2)}% (${interestRate > 0.08 ? 'Negative' : 'Neutral'} impact)</li>
                <li><strong>Collateral Ratio:</strong> ${collateralRatio.toFixed(1)} (${collateralRatio < 1.5 ? 'Negative' : 'Positive'} impact)</li>
                <li><strong>Market Volatility:</strong> ${marketVolatility.toFixed(2)} (${marketVolatility > 0.3 ? 'Negative' : 'Neutral'} impact)</li>
            </ul>
            <p>The most significant factors in this prediction are trust score and market volatility.</p>
        `;
        explanationDiv.classList.add('animate-fade-in');
    }, 500);
}

// Portfolio Optimization with Enhanced Animation
function optimizePortfolio() {
    // Get risk tolerance
    var riskTolerance = parseFloat(document.getElementById('risk-tolerance').value);
    
    // Calculate portfolio allocations based on risk tolerance
    const veryLowTrustAllocation = (60/riskTolerance).toFixed(1);
    const microLoansAllocation = (20/riskTolerance).toFixed(1);
    const lowTrustAllocation = (10*riskTolerance).toFixed(1);
    const mediumTrustAllocation = (5*riskTolerance).toFixed(1);
    const highTrustAllocation = (5*riskTolerance).toFixed(1);
    
    const expectedReturn = (0.12 - 0.01*riskTolerance).toFixed(2);
    const expectedRisk = (0.05 * riskTolerance).toFixed(2);
    const sharpeRatio = ((0.12 - 0.01*riskTolerance - 0.02)/(0.05 * riskTolerance)).toFixed(2);
    
    // Update the optimization result with animation
    var resultDiv = document.getElementById('optimization-result');
    resultDiv.innerHTML = '';
    
    setTimeout(() => {
        resultDiv.innerHTML = `
            <h4>Optimized Portfolio (Risk Tolerance: ${riskTolerance.toFixed(1)})</h4>
            <div class="allocation-bars">
                <div class="allocation-bar-container">
                    <div class="allocation-label">Very Low Trust, Very Large Loans</div>
                    <div class="allocation-bar-wrapper">
                        <div class="allocation-bar" style="width: 0%;" data-width="${veryLowTrustAllocation}%">
                            <span class="allocation-value">${veryLowTrustAllocation}%</span>
                        </div>
                    </div>
                </div>
                <div class="allocation-bar-container">
                    <div class="allocation-label">Very Low Trust, Micro Loans</div>
                    <div class="allocation-bar-wrapper">
                        <div class="allocation-bar" style="width: 0%;" data-width="${microLoansAllocation}%">
                            <span class="allocation-value">${microLoansAllocation}%</span>
                        </div>
                    </div>
                </div>
                <div class="allocation-bar-container">
                    <div class="allocation-label">Low Trust, Small Loans</div>
                    <div class="allocation-bar-wrapper">
                        <div class="allocation-bar" style="width: 0%;" data-width="${lowTrustAllocation}%">
                            <span class="allocation-value">${lowTrustAllocation}%</span>
                        </div>
                    </div>
                </div>
                <div class="allocation-bar-container">
                    <div class="allocation-label">Medium Trust, Medium Loans</div>
                    <div class="allocation-bar-wrapper">
                        <div class="allocation-bar" style="width: 0%;" data-width="${mediumTrustAllocation}%">
                            <span class="allocation-value">${mediumTrustAllocation}%</span>
                        </div>
                    </div>
                </div>
                <div class="allocation-bar-container">
                    <div class="allocation-label">High Trust, Large Loans</div>
                    <div class="allocation-bar-wrapper">
                        <div class="allocation-bar" style="width: 0%;" data-width="${highTrustAllocation}%">
                            <span class="allocation-value">${highTrustAllocation}%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="portfolio-metrics">
                <div class="metric">
                    <div class="metric-label">Expected Return</div>
                    <div class="metric-value">${expectedReturn}%</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Expected Risk</div>
                    <div class="metric-value">${expectedRisk}%</div>
                </div>
                <div class="metric">
                    <div class="metric-label">Sharpe Ratio</div>
                    <div class="metric-value">${sharpeRatio}</div>
                </div>
            </div>
        `;
        
        // Animate the allocation bars
        setTimeout(() => {
            const allocationBars = resultDiv.querySelectorAll('.allocation-bar');
            allocationBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width');
                bar.style.width = targetWidth;
            });
        }, 100);
        
        resultDiv.classList.add('animate-fade-in');
    }, 300);
}

// Simulation with Enhanced Visuals
function initializeSimulationCharts() {
    // Empty placeholder charts with improved styling
    Plotly.newPlot('sim-market-conditions', [{
        x: [0],
        y: [0],
        type: 'scatter',
        mode: 'lines',
        name: 'Run simulation to view data',
        line: {
            color: 'rgba(0, 102, 204, 0.5)',
            width: 2
        }
    }], {
        title: {
            text: 'Market Conditions',
            font: { size: 18, color: '#2c3e50' }
        },
        xaxis: { 
            title: 'Simulation Day',
            titlefont: { size: 14, color: '#6c757d' }
        },
        yaxis: { 
            title: 'Value',
            titlefont: { size: 14, color: '#6c757d' }
        },
        plot_bgcolor: 'rgba(255, 255, 255, 0)',
        paper_bgcolor: 'rgba(255, 255, 255, 0)',
        margin: { l: 50, r: 30, t: 50, b: 50 }
    });
    
    Plotly.newPlot('sim-loan-performance', [{
        x: [0],
        y: [0],
        type: 'scatter',
        mode: 'lines',
        name: 'Run simulation to view data',
        line: {
            color: 'rgba(0, 102, 204, 0.5)',
            width: 2
        }
    }], {
        title: {
            text: 'Loan Performance',
            font: { size: 18, color: '#2c3e50' }
        },
        xaxis: { 
            title: 'Simulation Day',
            titlefont: { size: 14, color: '#6c757d' }
        },
        yaxis: { 
            title: 'Value',
            titlefont: { size: 14, color: '#6c757d' }
        },
        plot_bgcolor: 'rgba(255, 255, 255, 0)',
        paper_bgcolor: 'rgba(255, 255, 255, 0)',
        margin: { l: 50, r: 30, t: 50, b: 50 }
    });
}

function runSimulation() {
    // Get simulation parameters
    var numBorrowers = parseInt(document.getElementById('sim-num-borrowers').value);
    var numLenders = parseInt(document.getElementById('sim-num-lenders').value);
    var duration = parseInt(document.getElementById('sim-duration').value);
    var volatility = parseFloat(document.getElementById('sim-volatility').value);
    var interestRate = parseFloat(document.getElementById('sim-interest-rate').value);
    
    // Show loading animation
    var resultsDiv = document.getElementById('simulation-results');
    resultsDiv.innerHTML = `
        <div class="loading-animation">
            <div class="loading-spinner"></div>
            <p>Running simulation...</p>
        </div>
    `;
    
    // Simulate processing time for better UX
    setTimeout(() => {
        // Update simulation results with animated appearance
        resultsDiv.innerHTML = `
            <h4>Simulation Results</h4>
            <div class="metrics-container">
                <div class="metric-card animate-scale" style="animation-delay: 0.1s;">
                    <p class="metric-label">Total Loans Issued</p>
                    <p class="metric-value">${(numBorrowers * 3).toLocaleString()}</p>
                </div>
                <div class="metric-card animate-scale" style="animation-delay: 0.2s;">
                    <p class="metric-label">Default Rate</p>
                    <p class="metric-value">${(1.5 * volatility * 100).toFixed(2)}%</p>
                </div>
                <div class="metric-card animate-scale" style="animation-delay: 0.3s;">
                    <p class="metric-label">Average Interest Rate</p>
                    <p class="metric-value">${interestRate.toFixed(2)}%</p>
                </div>
                <div class="metric-card animate-scale" style="animation-delay: 0.4s;">
                    <p class="metric-label">Simulation Duration</p>
                    <p class="metric-value">${duration} days</p>
                </div>
            </div>
            <p>Simulation completed successfully. View the charts below for detailed results.</p>
        `;
        
        // Generate market conditions data
        var days = Array.from({length: duration}, (_, i) => i);
        
        // Interest rates (random walk)
        var interestRates = [interestRate/100];
        for (var i = 1; i < duration; i++) {
            interestRates.push(interestRates[i-1] + (Math.random() - 0.5) * 0.002);
            interestRates[i] = Math.max(0.01, Math.min(0.2, interestRates[i]));
        }
        
        // Volatility (random walk)
        var volatilities = [volatility];
        for (var i = 1; i < duration; i++) {
            volatilities.push(volatilities[i-1] + (Math.random() - 0.5) * 0.01);
            volatilities[i] = Math.max(0.05, Math.min(0.5, volatilities[i]));
        }
        
        // Asset price (random walk with volatility)
        var assetPrices = [100];
        for (var i = 1; i < duration; i++) {
            assetPrices.push(assetPrices[i-1] * (1 + (Math.random() - 0.5) * volatilities[i-1]));
            assetPrices[i] = Math.max(10, assetPrices[i]);
        }
        
        // Update market conditions chart with animation
        Plotly.newPlot('sim-market-conditions', [
            {
                x: days,
                y: interestRates.map(r => r * 100), // Convert to percentage
                type: 'scatter',
                mode: 'lines',
                name: 'Interest Rate (%)',
                line: {
                    color: 'rgba(0, 102, 204, 0.8)',
                    width: 3,
                    shape: 'spline'
                },
                hoverinfo: 'y+text',
                hovertext: interestRates.map(r => `${(r * 100).toFixed(2)}%`),
                hoverlabel: {
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                    font: { color: 'white' }
                }
            },
            {
                x: days,
                y: volatilities,
                type: 'scatter',
                mode: 'lines',
                name: 'Volatility',
                line: {
                    color: 'rgba(255, 170, 0, 0.8)',
                    width: 3,
                    shape: 'spline'
                },
                hoverinfo: 'y+text',
                hovertext: volatilities.map(v => `${v.toFixed(2)}`),
                hoverlabel: {
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                    font: { color: 'white' }
                }
            },
            {
                x: days,
                y: assetPrices,
                type: 'scatter',
                mode: 'lines',
                name: 'Asset Price',
                line: {
                    color: 'rgba(0, 214, 143, 0.8)',
                    width: 3,
                    shape: 'spline'
                },
                hoverinfo: 'y+text',
                hovertext: assetPrices.map(p => `$${p.toFixed(2)}`),
                hoverlabel: {
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                    font: { color: 'white' }
                }
            }
        ], {
            title: {
                text: 'Market Conditions',
                font: { size: 18, color: '#2c3e50' }
            },
            xaxis: { 
                title: 'Simulation Day',
                titlefont: { size: 14, color: '#6c757d' }
            },
            yaxis: { 
                title: 'Value',
                titlefont: { size: 14, color: '#6c757d' }
            },
            plot_bgcolor: 'rgba(255, 255, 255, 0)',
            paper_bgcolor: 'rgba(255, 255, 255, 0)',
            margin: { l: 50, r: 30, t: 50, b: 50 },
            legend: { 
                orientation: 'h', 
                y: 1.1,
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                bordercolor: 'rgba(0, 0, 0, 0.1)',
                borderwidth: 1
            },
            transition: {
                duration: 1000,
                easing: 'cubic-in-out'
            }
        });
        
        // Generate loan performance data
        var loansIssued = Array(duration).fill(0);
        var loansActive = Array(duration).fill(0);
        var loansDefaulted = Array(duration).fill(0);
        var loansRepaid = Array(duration).fill(0);
        
        // Simple model for demonstration
        for (var i = 0; i < duration; i++) {
            // New loans issued each day (random with trend)
            loansIssued[i] = i === 0 ? 0 : loansIssued[i-1] + Math.floor(numBorrowers * 0.03 * (1 + Math.random() * 0.5));
            
            // Active loans (cumulative issued minus repaid and defaulted)
            loansActive[i] = i === 0 ? 0 : loansIssued[i] - loansRepaid[i] - loansDefaulted[i];
            
            // Defaults (based on volatility)
            loansDefaulted[i] = i === 0 ? 0 : Math.floor(loansActive[i-1] * volatilities[i] * 0.05);
            
            // Repayments (based on duration)
            loansRepaid[i] = i === 0 ? 0 : Math.floor(loansActive[i-1] * (1/duration) * 10);
        }
        
        // Update loan performance chart with animation
        Plotly.newPlot('sim-loan-performance', [
            {
                x: days,
                y: loansIssued,
                type: 'scatter',
                mode: 'lines',
                name: 'Loans Issued (Cumulative)',
                line: {
                    color: 'rgba(0, 102, 204, 0.8)',
                    width: 3,
                    shape: 'spline'
                },
                hoverinfo: 'y+text',
                hovertext: loansIssued.map(l => `${l.toLocaleString()} loans`),
                hoverlabel: {
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                    font: { color: 'white' }
                }
            },
            {
                x: days,
                y: loansActive,
                type: 'scatter',
                mode: 'lines',
                name: 'Active Loans',
                line: {
                    color: 'rgba(0, 214, 143, 0.8)',
                    width: 3,
                    shape: 'spline'
                },
                hoverinfo: 'y+text',
                hovertext: loansActive.map(l => `${l.toLocaleString()} loans`),
                hoverlabel: {
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                    font: { color: 'white' }
                }
            },
            {
                x: days,
                y: loansDefaulted,
                type: 'scatter',
                mode: 'lines',
                name: 'Defaulted Loans (Cumulative)',
                line: {
                    color: 'rgba(255, 56, 96, 0.8)',
                    width: 3,
                    shape: 'spline'
                },
                hoverinfo: 'y+text',
                hovertext: loansDefaulted.map(l => `${l.toLocaleString()} loans`),
                hoverlabel: {
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                    font: { color: 'white' }
                }
            },
            {
                x: days,
                y: loansRepaid,
                type: 'scatter',
                mode: 'lines',
                name: 'Repaid Loans (Cumulative)',
                line: {
                    color: 'rgba(255, 170, 0, 0.8)',
                    width: 3,
                    shape: 'spline'
                },
                hoverinfo: 'y+text',
                hovertext: loansRepaid.map(l => `${l.toLocaleString()} loans`),
                hoverlabel: {
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                    font: { color: 'white' }
                }
            }
        ], {
            title: {
                text: 'Loan Performance',
                font: { size: 18, color: '#2c3e50' }
            },
            xaxis: { 
                title: 'Simulation Day',
                titlefont: { size: 14, color: '#6c757d' }
            },
            yaxis: { 
                title: 'Number of Loans',
                titlefont: { size: 14, color: '#6c757d' }
            },
            plot_bgcolor: 'rgba(255, 255, 255, 0)',
            paper_bgcolor: 'rgba(255, 255, 255, 0)',
            margin: { l: 50, r: 30, t: 50, b: 50 },
            legend: { 
                orientation: 'h', 
                y: 1.1,
                bgcolor: 'rgba(255, 255, 255, 0.7)',
                bordercolor: 'rgba(0, 0, 0, 0.1)',
                borderwidth: 1
            },
            transition: {
                duration: 1000,
                easing: 'cubic-in-out'
            }
        });
    }, 1500);
}

// Data Explorer with Enhanced Interactivity
function initializeDataExplorer() {
    // Sample data for demonstration
    var loanData = [
        { loan_id: 1, borrower_id: 101, trust_score: 0.85, loan_amount: 15000, interest_rate: 0.05, defaulted: 0 },
        { loan_id: 2, borrower_id: 102, trust_score: 0.65, loan_amount: 25000, interest_rate: 0.07, defaulted: 0 },
        { loan_id: 3, borrower_id: 103, trust_score: 0.45, loan_amount: 10000, interest_rate: 0.09, defaulted: 1 },
        { loan_id: 4, borrower_id: 104, trust_score: 0.92, loan_amount: 50000, interest_rate: 0.04, defaulted: 0 },
        { loan_id: 5, borrower_id: 105, trust_score: 0.35, loan_amount: 7500, interest_rate: 0.11, defaulted: 1 }
    ];
    
    var borrowerData = [
        { borrower_id: 101, income: 75000, debt_to_income: 0.25, age: 35, employment_length: 8 },
        { borrower_id: 102, income: 60000, debt_to_income: 0.30, age: 42, employment_length: 15 },
        { borrower_id: 103, income: 45000, debt_to_income: 0.40, age: 28, employment_length: 3 },
        { borrower_id: 104, income: 120000, debt_to_income: 0.20, age: 50, employment_length: 25 },
        { borrower_id: 105, income: 35000, debt_to_income: 0.45, age: 22, employment_length: 1 }
    ];
    
    var segmentStats = [
        { segment: 'High_Large', expected_return: 0.08, risk: 0.05, num_loans: 150, default_rate: 0.03 },
        { segment: 'Medium_Medium', expected_return: 0.10, risk: 0.07, num_loans: 300, default_rate: 0.05 },
        { segment: 'Low_Small', expected_return: 0.12, risk: 0.09, num_loans: 500, default_rate: 0.08 }
    ];
    
    // Store data in window object for access
    window.explorerData = {
        loan_data: loanData,
        borrower_data: borrowerData,
        segment_stats: segmentStats
    };
    
    // Populate dataset selector options
    var datasetSelector = document.getElementById('dataset-selector');
    if (!datasetSelector) return;
    
    // Set up initial selectors
    updateAxisSelectors('loan_data');
    
    // Create initial visualization
    createExplorerVisualization('loan_data', 'scatter', 'loan_amount', 'interest_rate', 'defaulted');
}

function updateAxisSelectors(dataset) {
    const data = window.explorerData[dataset];
    if (!data || !data.length) return;
    
    const keys = Object.keys(data[0]);
    
    const xAxisSelector = document.getElementById('x-axis-selector');
    const yAxisSelector = document.getElementById('y-axis-selector');
    const colorSelector = document.getElementById('color-selector');
    const filterSelector = document.getElementById('filter-selector');
    
    if (!xAxisSelector || !yAxisSelector || !colorSelector || !filterSelector) return;
    
    // Clear existing options
    xAxisSelector.innerHTML = '';
    yAxisSelector.innerHTML = '';
    colorSelector.innerHTML = '';
    filterSelector.innerHTML = '';
    
    // Add option for no color/filter
    colorSelector.innerHTML += `<option value="">None</option>`;
    filterSelector.innerHTML += `<option value="">None</option>`;
    
    // Add options for each key
    keys.forEach(key => {
        xAxisSelector.innerHTML += `<option value="${key}">${key}</option>`;
        yAxisSelector.innerHTML += `<option value="${key}">${key}</option>`;
        colorSelector.innerHTML += `<option value="${key}">${key}</option>`;
        filterSelector.innerHTML += `<option value="${key}">${key}</option>`;
    });
    
    // Set default selections
    if (keys.includes('loan_amount')) {
        xAxisSelector.value = 'loan_amount';
    } else {
        xAxisSelector.selectedIndex = 0;
    }
    
    if (keys.includes('interest_rate')) {
        yAxisSelector.value = 'interest_rate';
    } else if (keys.length > 1) {
        yAxisSelector.selectedIndex = 1;
    } else {
        yAxisSelector.selectedIndex = 0;
    }
    
    if (keys.includes('defaulted')) {
        colorSelector.value = 'defaulted';
    } else {
        colorSelector.selectedIndex = 0;
    }
    
    filterSelector.selectedIndex = 0;
}

function updateDataExplorer() {
    const dataset = document.getElementById('dataset-selector').value;
    const vizType = document.getElementById('viz-type-selector').value;
    const xAxis = document.getElementById('x-axis-selector').value;
    const yAxis = document.getElementById('y-axis-selector').value;
    const colorBy = document.getElementById('color-selector').value;
    
    updateAxisSelectors(dataset);
    createExplorerVisualization(dataset, vizType, xAxis, yAxis, colorBy);
}

function createExplorerVisualization(dataset, vizType, xAxis, yAxis, colorBy) {
    const data = window.explorerData[dataset];
    if (!data || !data.length) return;
    
    const graphDiv = document.getElementById('data-explorer-graph');
    if (!graphDiv) return;
    
    let plotData = [];
    let layout = {
        title: {
            text: `${dataset.replace('_', ' ')} - ${xAxis} vs ${yAxis}`,
            font: { size: 18, color: '#2c3e50' }
        },
        xaxis: { 
            title: xAxis,
            titlefont: { size: 14, color: '#6c757d' }
        },
        yaxis: { 
            title: yAxis,
            titlefont: { size: 14, color: '#6c757d' }
        },
        plot_bgcolor: 'rgba(255, 255, 255, 0)',
        paper_bgcolor: 'rgba(255, 255, 255, 0)',
        margin: { l: 50, r: 30, t: 50, b: 50 },
        transition: {
            duration: 500,
            easing: 'cubic-in-out'
        }
    };
    
    if (vizType === 'scatter') {
        if (colorBy && colorBy !== '') {
            // Group data by color value
            const groupedData = {};
            data.forEach(item => {
                const colorValue = item[colorBy];
                if (!groupedData[colorValue]) {
                    groupedData[colorValue] = [];
                }
                groupedData[colorValue].push(item);
            });
            
            // Create a trace for each color group
            Object.keys(groupedData).forEach((colorValue, index) => {
                const items = groupedData[colorValue];
                const colors = ['rgba(0, 102, 204, 0.7)', 'rgba(255, 56, 96, 0.7)', 'rgba(0, 214, 143, 0.7)', 'rgba(255, 170, 0, 0.7)'];
                
                plotData.push({
                    x: items.map(item => item[xAxis]),
                    y: items.map(item => item[yAxis]),
                    mode: 'markers',
                    type: 'scatter',
                    name: `${colorBy}: ${colorValue}`,
                    marker: {
                        color: colors[index % colors.length],
                        size: 10,
                        line: {
                            color: 'white',
                            width: 1
                        }
                    },
                    hoverinfo: 'text',
                    hovertext: items.map(item => {
                        let text = '';
                        Object.keys(item).forEach(key => {
                            text += `${key}: ${item[key]}<br>`;
                        });
                        return text;
                    }),
                    hoverlabel: {
                        bgcolor: 'rgba(0, 0, 0, 0.8)',
                        font: { color: 'white' }
                    }
                });
            });
        } else {
            plotData.push({
                x: data.map(item => item[xAxis]),
                y: data.map(item => item[yAxis]),
                mode: 'markers',
                type: 'scatter',
                marker: {
                    color: 'rgba(0, 102, 204, 0.7)',
                    size: 10,
                    line: {
                        color: 'white',
                        width: 1
                    }
                },
                hoverinfo: 'text',
                hovertext: data.map(item => {
                    let text = '';
                    Object.keys(item).forEach(key => {
                        text += `${key}: ${item[key]}<br>`;
                    });
                    return text;
                }),
                hoverlabel: {
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                    font: { color: 'white' }
                }
            });
        }
    } else if (vizType === 'histogram') {
        plotData.push({
            x: data.map(item => item[xAxis]),
            type: 'histogram',
            marker: {
                color: 'rgba(0, 102, 204, 0.7)',
                line: {
                    color: 'rgba(0, 102, 204, 1)',
                    width: 1
                }
            },
            hoverlabel: {
                bgcolor: 'rgba(0, 0, 0, 0.8)',
                font: { color: 'white' }
            }
        });
        
        layout.title.text = `Distribution of ${xAxis}`;
        layout.yaxis.title = 'Count';
    } else if (vizType === 'box') {
        if (colorBy && colorBy !== '') {
            // Group data by color value
            const groupedData = {};
            data.forEach(item => {
                const colorValue = item[colorBy];
                if (!groupedData[colorValue]) {
                    groupedData[colorValue] = [];
                }
                groupedData[colorValue].push(item);
            });
            
            // Create a trace for each color group
            Object.keys(groupedData).forEach((colorValue, index) => {
                const items = groupedData[colorValue];
                const colors = ['rgba(0, 102, 204, 0.7)', 'rgba(255, 56, 96, 0.7)', 'rgba(0, 214, 143, 0.7)', 'rgba(255, 170, 0, 0.7)'];
                
                plotData.push({
                    y: items.map(item => item[yAxis]),
                    type: 'box',
                    name: `${colorBy}: ${colorValue}`,
                    marker: {
                        color: colors[index % colors.length]
                    },
                    boxmean: true,
                    hoverlabel: {
                        bgcolor: 'rgba(0, 0, 0, 0.8)',
                        font: { color: 'white' }
                    }
                });
            });
        } else {
            plotData.push({
                y: data.map(item => item[yAxis]),
                type: 'box',
                marker: {
                    color: 'rgba(0, 102, 204, 0.7)'
                },
                boxmean: true,
                hoverlabel: {
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                    font: { color: 'white' }
                }
            });
        }
        
        layout.title.text = `Box Plot of ${yAxis}`;
    } else if (vizType === 'bar') {
        if (colorBy && colorBy !== '') {
            // Group data by x-axis value and color
            const groupedData = {};
            data.forEach(item => {
                const xValue = item[xAxis];
                const colorValue = item[colorBy];
                
                if (!groupedData[xValue]) {
                    groupedData[xValue] = {};
                }
                
                if (!groupedData[xValue][colorValue]) {
                    groupedData[xValue][colorValue] = [];
                }
                
                groupedData[xValue][colorValue].push(item);
            });
            
            // Calculate average y-value for each group
            const xValues = Object.keys(groupedData);
            const colorValues = Array.from(new Set(data.map(item => item[colorBy])));
            
            colorValues.forEach((colorValue, index) => {
                const colors = ['rgba(0, 102, 204, 0.7)', 'rgba(255, 56, 96, 0.7)', 'rgba(0, 214, 143, 0.7)', 'rgba(255, 170, 0, 0.7)'];
                
                const yValues = xValues.map(xValue => {
                    const items = groupedData[xValue][colorValue] || [];
                    if (items.length === 0) return 0;
                    
                    // Calculate average y-value
                    const sum = items.reduce((acc, item) => acc + item[yAxis], 0);
                    return sum / items.length;
                });
                
                plotData.push({
                    x: xValues,
                    y: yValues,
                    type: 'bar',
                    name: `${colorBy}: ${colorValue}`,
                    marker: {
                        color: colors[index % colors.length]
                    },
                    hoverlabel: {
                        bgcolor: 'rgba(0, 0, 0, 0.8)',
                        font: { color: 'white' }
                    }
                });
            });
            
            layout.barmode = 'group';
        } else {
            // Group data by x-axis value
            const groupedData = {};
            data.forEach(item => {
                const xValue = item[xAxis];
                
                if (!groupedData[xValue]) {
                    groupedData[xValue] = [];
                }
                
                groupedData[xValue].push(item);
            });
            
            // Calculate average y-value for each group
            const xValues = Object.keys(groupedData);
            const yValues = xValues.map(xValue => {
                const items = groupedData[xValue];
                
                // Calculate average y-value
                const sum = items.reduce((acc, item) => acc + item[yAxis], 0);
                return sum / items.length;
            });
            
            plotData.push({
                x: xValues,
                y: yValues,
                type: 'bar',
                marker: {
                    color: 'rgba(0, 102, 204, 0.7)'
                },
                hoverlabel: {
                    bgcolor: 'rgba(0, 0, 0, 0.8)',
                    font: { color: 'white' }
                }
            });
        }
    }
    
    Plotly.newPlot(graphDiv, plotData, layout);
    
    // Update data preview
    updateDataPreview(dataset);
}

function updateFilterControls() {
    const filterSelector = document.getElementById('filter-selector');
    const filterControls = document.getElementById('filter-controls');
    
    if (!filterSelector || !filterControls) return;
    
    const filterBy = filterSelector.value;
    
    if (!filterBy || filterBy === '') {
        filterControls.innerHTML = '';
        return;
    }
    
    const dataset = document.getElementById('dataset-selector').value;
    const data = window.explorerData[dataset];
    
    if (!data || !data.length) return;
    
    // Determine filter type based on data
    const sampleValue = data[0][filterBy];
    let filterType = typeof sampleValue;
    
    if (filterType === 'number') {
        // For numeric values, create min/max range
        const values = data.map(item => item[filterBy]);
        const min = Math.min(...values);
        const max = Math.max(...values);
        
        filterControls.innerHTML = `
            <div class="filter-range">
                <label>${filterBy} Range:</label>
                <div class="range-inputs">
                    <input type="number" id="filter-min" value="${min}" min="${min}" max="${max}" step="0.01">
                    <span>to</span>
                    <input type="number" id="filter-max" value="${max}" min="${min}" max="${max}" step="0.01">
                </div>
                <button class="button" onclick="applyFilter()">Apply Filter</button>
            </div>
        `;
    } else {
        // For categorical values, create checkboxes
        const uniqueValues = Array.from(new Set(data.map(item => item[filterBy])));
        
        let checkboxes = '';
        uniqueValues.forEach(value => {
            checkboxes += `
                <div class="checkbox-item">
                    <input type="checkbox" id="filter-${value}" value="${value}" checked>
                    <label for="filter-${value}">${value}</label>
                </div>
            `;
        });
        
        filterControls.innerHTML = `
            <div class="filter-categories">
                <label>${filterBy} Categories:</label>
                <div class="checkbox-group">
                    ${checkboxes}
                </div>
                <button class="button" onclick="applyFilter()">Apply Filter</button>
            </div>
        `;
    }
}

function applyFilter() {
    const dataset = document.getElementById('dataset-selector').value;
    const filterBy = document.getElementById('filter-selector').value;
    const vizType = document.getElementById('viz-type-selector').value;
    const xAxis = document.getElementById('x-axis-selector').value;
    const yAxis = document.getElementById('y-axis-selector').value;
    const colorBy = document.getElementById('color-selector').value;
    
    let filteredData = [...window.explorerData[dataset]];
    
    if (filterBy && filterBy !== '') {
        const sampleValue = filteredData[0][filterBy];
        let filterType = typeof sampleValue;
        
        if (filterType === 'number') {
            // Apply numeric range filter
            const minValue = parseFloat(document.getElementById('filter-min').value);
            const maxValue = parseFloat(document.getElementById('filter-max').value);
            
            filteredData = filteredData.filter(item => {
                const value = item[filterBy];
                return value >= minValue && value <= maxValue;
            });
        } else {
            // Apply categorical filter
            const uniqueValues = Array.from(new Set(filteredData.map(item => item[filterBy])));
            const selectedValues = [];
            
            uniqueValues.forEach(value => {
                const checkbox = document.getElementById(`filter-${value}`);
                if (checkbox && checkbox.checked) {
                    selectedValues.push(value);
                }
            });
            
            filteredData = filteredData.filter(item => selectedValues.includes(item[filterBy]));
        }
    }
    
    // Store filtered data
    window.explorerData[`${dataset}_filtered`] = filteredData;
    
    // Update visualization with filtered data
    createExplorerVisualization(`${dataset}_filtered`, vizType, xAxis, yAxis, colorBy);
}

function updateDataPreview(dataset) {
    const previewDiv = document.getElementById('data-preview');
    if (!previewDiv) return;
    
    const data = window.explorerData[dataset];
    if (!data || !data.length) return;
    
    // Create table headers
    const keys = Object.keys(data[0]);
    let tableHeaders = '';
    keys.forEach(key => {
        tableHeaders += `<th>${key}</th>`;
    });
    
    // Create table rows (limit to 5 rows)
    let tableRows = '';
    const rowLimit = Math.min(data.length, 5);
    for (let i = 0; i < rowLimit; i++) {
        let row = '<tr>';
        keys.forEach(key => {
            row += `<td>${data[i][key]}</td>`;
        });
        row += '</tr>';
        tableRows += row;
    }
    
    // Create table
    previewDiv.innerHTML = `
        <h4>Data Preview (${data.length} records)</h4>
        <div class="table-container">
            <table>
                <thead>
                    <tr>${tableHeaders}</tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>
        </div>
    `;
}

// Add CSS for additional animations
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-animation {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); color: var(--primary-color); }
            100% { transform: scale(1); }
        }
        
        .pulse-animation {
            animation: pulse-animation 0.5s ease;
        }
        
        .loading-animation {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 30px;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid rgba(0, 102, 204, 0.2);
            border-top: 4px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 15px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        .allocation-bars {
            margin-top: 20px;
        }
        
        .allocation-bar-container {
            margin-bottom: 15px;
        }
        
        .allocation-label {
            font-weight: 500;
            margin-bottom: 5px;
            font-size: 0.9rem;
            color: var(--text-secondary);
        }
        
        .allocation-bar-wrapper {
            height: 25px;
            background-color: #f5f5f7;
            border-radius: 12px;
            overflow: hidden;
        }
        
        .allocation-bar {
            height: 100%;
            background: var(--primary-gradient);
            border-radius: 12px;
            transition: width 1s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 10px;
        }
        
        .allocation-value {
            color: white;
            font-weight: 600;
            font-size: 0.9rem;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .portfolio-metrics {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
        }
        
        .metric {
            background-color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
            flex: 1;
            margin: 0 10px;
            text-align: center;
            transition: transform 0.3s ease;
        }
        
        .metric:hover {
            transform: translateY(-5px);
        }
        
        .metric-label {
            font-size: 0.9rem;
            color: var(--text-secondary);
            margin-bottom: 5px;
        }
        
        .metric-value {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--primary-color);
        }
        
        .filter-range {
            margin: 20px 0;
            padding: 20px;
            background-color: #f5f5f7;
            border-radius: 12px;
        }
        
        .range-inputs {
            display: flex;
            align-items: center;
            margin: 10px 0 20px;
        }
        
        .range-inputs input {
            width: 100px;
            padding: 10px;
            border: 1px solid #d2d2d7;
            border-radius: 8px;
        }
        
        .range-inputs span {
            margin: 0 15px;
            color: var(--text-secondary);
        }
        
        .filter-categories {
            margin: 20px 0;
            padding: 20px;
            background-color: #f5f5f7;
            border-radius: 12px;
        }
        
        .checkbox-group {
            display: flex;
            flex-wrap: wrap;
            margin: 10px 0 20px;
        }
        
        .checkbox-item {
            margin-right: 20px;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
        }
        
        .checkbox-item input {
            margin-right: 5px;
        }
        
        .creator-section.visible {
            animation: fadeInUp 1s ease-out;
        }
        
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});
